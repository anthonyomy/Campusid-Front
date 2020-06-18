import React, {useState, useEffect} from 'react';
import ImageCard from '../Card/ImageCard';
import { getMessages } from '../../../api/index';
import { useCurrentUser } from 'common/hooks';

function ContainerEvent(props: any) {
    const [events, setEvents] = useState([]);
    const currentUser = useCurrentUser();

    useEffect(() => {
        getMessages(currentUser.idboard)
            .then((res : any) => {
                let tmpMessages = res.map((message: any) => {
                    return {
                       title: message.title,
                       desc: message.bbcode,
                       important: message.priority
                    }
                });
                setEvents(tmpMessages);
            })
    }, []);
    return (
        <> {events.length > 0 ? (<>
        {events.map((item: any, index: any) => (
                <div className="cardInternship" key={index}>
                    <ImageCard
                        image={
                            item.important ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem-important-red.svg/1200px-Emblem-important-red.svg.png' :
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Information.svg/2000px-Information.svg.png'
                        }
                        title={item.title}
                        text={
                            item.desc
                        }
                        hasButton={false}
                        buttonText={'détails'}
                        altImage={'Evenements'}
                        textCompany={''}
                        typeDeMission={''}
                        duree={''}
                        start={''}
                        end={''}
                        contact={''}
                        phone={''}
                        mail={''}
                        adress={''}
                        postal={''}
                        ville={''}
                        pays={''}
                    />
                </div>
            ))} </>) :
            <ImageCard
                image={
                    "https://sumeyyaarar.com/wp-content/uploads/2018/07/empty_baslik.png"
                }
                title={"Aucun événements a affiché"}
                text={
                    ""
                }
                hasButton={false}
                buttonText={'détails'}
                altImage={'Evenements'}
                textCompany={''}
                typeDeMission={''}
                duree={''}
                start={''}
                end={''}
                contact={''}
                phone={''}
                mail={''}
                adress={''}
                postal={''}
                ville={''}
                pays={''}
            />
        }
            </>
    );
}

export default ContainerEvent;
