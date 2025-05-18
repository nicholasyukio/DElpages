// src/auth/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userpool from '../userpool';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAndRefreshSession = async () => {
    const cognitoUser = userpool.getCurrentUser();
    if (!cognitoUser) return null;

    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          // Session is invalid, try to refresh
          cognitoUser.refreshSession(session.getRefreshToken(), (err, newSession) => {
            if (err) {
              // If refresh fails, clear the user state
              setUser(null);
              reject(err);
            } else {
              // Session refreshed successfully
              resolve(cognitoUser);
            }
          });
        } else {
          // Session is valid
          resolve(cognitoUser);
        }
      });
    });
  };

  // Check current session on load
  useEffect(() => {
    const currentUser = userpool.getCurrentUser();
    if (currentUser) {
      currentUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          setUser(null);
        } else {
          currentUser.getUserAttributes((err, attributes) => {
            if (err) {
              console.log("Error fetching user attributes:", err);
            } else {
              const attrMap = {};
              attributes.forEach(attr => {
                attrMap[attr.getName()] = attr.getValue();
              });
              setUser({ cognitoUser: currentUser, attributes: attrMap });
            }
            setLoading(false);
          });
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (Email, Password) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: Email,
        Pool: userpool,
      });

      const authDetails = new AuthenticationDetails({
        Username: Email,
        Password,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
            cognitoUser.getUserAttributes((err, attributes) => {
                if (err) {
                console.log("Error fetching user attributes:", err);
                setUser({ cognitoUser });
                } else {
                const attrMap = {};
                attributes.forEach(attr => {
                    attrMap[attr.getName()] = attr.getValue();
                });
                setUser({ cognitoUser, attributes: attrMap });
                }
            });
            resolve(result);
        },
        onFailure: (err) => {
            reject(err);
        },
      });
    });
  };

  const logout = () => {
    const currentUser = userpool.getCurrentUser();
    if (currentUser) currentUser.signOut();
    setUser(null);
    window.location.href = '/logon';
  };

  const signup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      const attributeList = [];
  
      attributeList.push(new CognitoUserAttribute({ Name: 'email', Value: email }));
      attributeList.push(new CognitoUserAttribute({ Name: 'birthdate', Value: '1900-01-01' }));
      attributeList.push(new CognitoUserAttribute({ Name: 'gender', Value: 'none' }));
      attributeList.push(new CognitoUserAttribute({ Name: 'picture', Value: 'default_picture_url.png' }));
      attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: '+1234567890' }));
      attributeList.push(new CognitoUserAttribute({ Name: 'given_name', Value: name }));
      attributeList.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
  
      userpool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  const forgotPassword = (email, onInputVerificationCode) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userpool
      });
  
      user.forgotPassword({
        onSuccess: resolve,
        onFailure: reject,
        inputVerificationCode: onInputVerificationCode
      });
    });
  };
  
  const confirmPassword = (email, code, newPassword) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: userpool
      });
  
      user.confirmPassword(code, newPassword, {
        onSuccess: resolve,
        onFailure: reject
      });
    });
  };  

  const getEnrolledCourses = async () => {
    try {
      const cognitoUser = await checkAndRefreshSession();
      if (!cognitoUser) return [];

      return new Promise((resolve, reject) => {
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            console.error('Error getting user attributes:', err);
            resolve([]);
            return;
          }

          const enrolledCourses = attributes.find(attr => 
            attr.getName() === 'custom:enrolled_courses'
          )?.getValue() || '[]';

          resolve(JSON.parse(enrolledCourses));
        });
      });
    } catch (err) {
      console.error('Session error:', err);
      return [];
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      const cognitoUser = await checkAndRefreshSession();
      if (!cognitoUser) throw new Error('User not authenticated');

      const currentCourses = await getEnrolledCourses();
      if (!currentCourses.includes(courseId)) {
        currentCourses.push(courseId);
        const attribute = new CognitoUserAttribute({
          Name: 'custom:enrolled_courses',
          Value: JSON.stringify(currentCourses)
        });

        return new Promise((resolve, reject) => {
          cognitoUser.updateAttributes([attribute], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
      return Promise.resolve('Already enrolled');
    } catch (err) {
      console.error('Enrollment error:', err);
      throw err;
    }
  };

  const isEnrolledInCourse = async (courseId) => {
    const enrolledCourses = await getEnrolledCourses();
    return enrolledCourses.includes(courseId);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    forgotPassword,
    confirmPassword,
    getEnrolledCourses,
    enrollInCourse,
    isEnrolledInCourse
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);