import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";

type TCourse = {
  [index: string]: any;
};

type TSection = {
  section: number;
  _id: string;
  days: string[];
  startTime: string;
  endTime: string;
};

const OfferedCourse = () => {
  const { data: offeredCoursesData } = useGetMyOfferedCoursesQuery(undefined);

  const [enroll] = useEnrollCourseMutation();
  // console.log(offeredCoursesData);

  const singleObject = offeredCoursesData?.data?.reduce(
    (acc: TCourse, item) => {
      const key = item.course.title;
      // console.log(key);
      // console.log(item);
      acc[key] = acc[key] || { courseTitle: key, sections: [] };

      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });

      return acc;
    },
    {}
  );

  console.log(singleObject);
  console.log(Object.values(singleObject ? singleObject : {}));

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = await enroll(enrollData);
    console.log(res);
  };

  if (!modifiedData) {
    return <p>No Available Course.</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item, idx) => {
        return (
          <Col key={idx} span={24} style={{ border: "solid #d4d4d4 2px" }}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section: TSection, idx: number) => {
                return (
                  <Row
                    key={idx}
                    justify="space-between"
                    align="middle"
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {section.section} </Col>
                    <Col span={5}>
                      days:
                      {section.days.map((day, idx) => (
                        <span key={idx}> {day} </span>
                      ))}
                    </Col>
                    <Col span={5}>Start Time: {section.startTime} </Col>
                    <Col span={5}>End Time: {section.endTime} </Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;

// [
//   { course: { title: 'React' }, section: 1, _id: 'sdfasdfasdfas45345' },
//   { course: { title: 'React' }, section: 2, _id: 'sdfasdfasdfas45345' },
//   { course: { title: 'Redux' }, section: 1, _id: 'sdfasdfasdfas45345' },
// ];

// [
//   {
//     courseTitle: 'React',
//     sections: [
//       { section: 1, _id: 'ADFa4345basdfa' },
//       { section: 2, _id: 'ADFa4345basdf3' },
//     ],
//   },
//   {
//     courseTitle: 'Redux',
//     sections: [{ section: 1, _id: 'ADFa4345basdfa' }],
//   },
// ];
