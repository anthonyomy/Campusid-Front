import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './style';
import moment from 'moment';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';
import ButtonCustom from '../ButtonCustom';
import { fetchCourses } from 'api/index';
import { getIdCurrentClass } from 'common/state/selectors';

export default function Planning() {
    const [courses, setCourses] = useState<EventInput[]>([]);
    // const idCurrentClass = useSelector(getIdCurrentClass);
    const idCurrentClass = 65; // only for dev

    const now = moment();
    const sixMonthBefore = now.subtract(6, 'months').format('Y-MM-DD');
    const sixMonthAfter = now.add(6, 'months').format('Y-MM-DD');

    let tmpCourses: any = [];

    useEffect(() => {
        fetchCourses(idCurrentClass, sixMonthBefore, sixMonthAfter)
            .then((res: any) => {
                Object.entries(res).forEach(function(tmpCourse: any) {
                    let titleSplit = tmpCourse[1].descriptionDefaultValue.split(
                        '–'
                    );

                    tmpCourses.push({
                        title: titleSplit[0],
                        titleInfo: titleSplit[1],
                        start: moment(tmpCourse[1].dateStart).toDate(),
                        end: moment(tmpCourse[1].dateEnd).toDate(),
                        description: tmpCourse[1].teacherName,
                        backgroundColor: '#' + tmpCourse[1].backGroundColor,
                        fontColor: '#' + tmpCourse[1].fontColor,
                    });
                });
            })
            .then(() => {
                setCourses(tmpCourses);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, []);

    const classes = styles();
    const calendarComponentRef = React.createRef<FullCalendar>();
    const [calendarWeekends, setCalendarWeekends] = useState(false);

    const toggleWeekends = () => {
        setCalendarWeekends(!calendarWeekends);
    };

    const eventRender = ({ event, el, view }: any) => {
        // do not display teacher name on month view
        if (view.viewSpec.type !== 'dayGridMonth') {
            const description = event.extendedProps.description;
            var divTeacher = document.createElement('div');
            var text = document.createTextNode('Enseignant : ' + description);
            divTeacher.appendChild(text);
            el.appendChild(divTeacher);

            const coursesInfo =
                event.extendedProps.titleInfo !== undefined
                    ? event.extendedProps.titleInfo
                    : '';
            var divInfo = document.createElement('div');
            var textInfo = document.createTextNode(coursesInfo);
            divInfo.appendChild(textInfo);
            el.appendChild(divInfo);
        }
    };

    return (
        <div className={classes.demoApp}>
            <div className={classes.demoAppTop}>
                <ButtonCustom
                    className={classes.demoAppTop}
                    callBack={toggleWeekends}
                    valueButton="Weekend"
                />
            </div>
            <div className={classes.demoAppCalendar}>
                <FullCalendar
                    defaultView="timeGridWeek"
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    }}
                    buttonText={{
                        today: "aujoud'hui",
                        month: 'mois',
                        week: 'semaine',
                        day: 'jour',
                        list: 'liste',
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    ref={calendarComponentRef}
                    weekends={calendarWeekends}
                    events={courses}
                    locale={'fr'}
                    minTime="09:00:00"
                    maxTime="18:00:00"
                    eventRender={eventRender}
                    fixedWeekCount={false}
                    firstDay={1}
                    allDaySlot={false}
                    height={700}
                    footer={true}
                />
            </div>
        </div>
    );
}
