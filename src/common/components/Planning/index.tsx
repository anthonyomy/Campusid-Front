import React, { useState, useEffect } from 'react';
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

interface DemoAppState {
    calendarWeekends: boolean;
    calendarEvents: EventInput[];
}

export default function Planning() {
    const [courses, setCourses] = useState<EventInput[]>([]);

    let tmpCourses: any = [];

    useEffect(() => {
        fetchCourses(65, '2019-09-01', '2020-07-01')
            .then((res: any) => {
                Object.entries(res).forEach(function(tmpCourse: any) {
                    tmpCourses.push({
                        title: tmpCourse[1].descriptionDefaultValue,
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
            .catch(e => {
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
        console.log(view);

        if (view.viewSpec.type !== 'dayGridMonth') {
            // do not display teacher name on month view
            const description = event.extendedProps.description;
            var div = document.createElement('div');
            var text = document.createTextNode('Enseignant : ' + description);
            div.appendChild(text);
            el.appendChild(div);
        }
    };

    console.log(courses);
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
                    defaultView="dayGridMonth"
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
