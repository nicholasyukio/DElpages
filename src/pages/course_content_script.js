// Função para expandir ou recolher o menu
export function toggleLessonList(event) {
    const lessonList = event.currentTarget.querySelector('.lesson-list');
    if (lessonList.style.display === 'block') {
        lessonList.style.display = 'none';
    } else {
        // Oculta todas as outras listas de aulas
        document.querySelectorAll('.lesson-list').forEach(otherLessonList => {
            if (otherLessonList !== lessonList) {
                otherLessonList.style.display = 'none';
            }
        });
        lessonList.style.display = 'block';
    }
    //console.log(`toggleLessonList click`);
}

