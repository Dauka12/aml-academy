import "../editCatalog.scss";
export default function Confirm({ course_title, course_id, closeModal, deleteCourse }) {
    return (
        <div className="confirm">
            <h1 className="question">Вы уверены что хотите удалить курс: <pre>{course_title}? </pre></h1>
            <div>
                <p onClick={closeModal} className="no-button">НЕТ</p>
                <p onClick={() => deleteCourse(course_id)} className="yes-button">ДА</p>
            </div>
        </div>
    );
};
