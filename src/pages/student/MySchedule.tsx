import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const MySchedule = () => {
  const { data: myEnrolledCourses } = useGetMyEnrolledCoursesQuery(undefined);
  // console.log(myEnrolledCourses);

  return (
    <div>
      {myEnrolledCourses?.data?.map((item: any) => {
        return (
          <div key={item._id}>
            <div>{item.course.title}</div>
            <div>{item?.offeredCourse?.section}</div>
            <div>{item?.offeredCourse?.section}</div>
            <div>
              {item?.offeredCourse?.days.map((day: string, idx: number) => (
                <span key={idx}> {day} </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MySchedule;
