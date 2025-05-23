const baseAPI_URL = process.env.REACT_APP_BACKEND_API_BASE_ENDPOINT;

export async function isUserEnrolledInCourse(userId, courseId) {
    const userData = await getUserData(userId);
    return Array.isArray(userData.courses_enrolled) && userData.courses_enrolled.includes(courseId);
  }  

export async function getUserData(userId) {
  const response = await fetch(`${baseAPI_URL}/get-user-data/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return await response.json();
}

export async function upgradeAccount(userId) {
  const response = await fetch(`${baseAPI_URL}/upgrade-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to upgrade account');
  }
  return await response.json();
}

export async function enrollUserInCourse(userId, courseId) {
  console.log(`userId: ${userId}`);
  console.log(`courseId: ${courseId}`);
  const response = await fetch(`${baseAPI_URL}/enroll-user-in-course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, course_id: courseId }),
  });

  if (!response.ok) {
    throw new Error('Failed to enroll user in course');
  }
  return await response.json();
}
