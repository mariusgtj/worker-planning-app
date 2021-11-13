import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin from '@fullcalendar/interaction'
// import SaveDialog from './SaveDialog'
import AddEvent from './AddEvent'

/**
 * Obs:
 * To make appear other properties of events, we neead to use a content injection hook named "eventContent"
 */

const initialEvents = [

    {
        title: "Alex Machedon",
        start: new Date(2021, 10, 5),
        end: new Date(2021, 10, 7),
        workType: "Night"
    },
    {
        title: "Big Boss",
        // allDay: true,
        start: new Date(2021, 10, 10),
        end: new Date(2021, 10, 11),
        workType: "Day"
    },
    {
        // See the difference between new Date() and string -> "2021-11-23"
        title: "John Doe",
        start: "2021-11-22",
        end: "2021-11-23",
        workType: "Day"

    },
];

const Calendar =  () => {

    const [show, setShow] = useState(false); // This shows when user double clicks (...setShow(true)...)
    const [selected, setSelected] = useState(new Date())

    const [allEvents, setAllEvents] = useState(initialEvents);


    //-----//------------  Var 2 of handleDateClick -----//---------//----------------------
    /* We want different actions on: click and doubleClick .
    We do this with setTimeout().
    We also need to know the square the user clicked on.
    */

    let clicks=0; // need to cout the no of clicks
    let timer = setTimeout(() => {}, 500);
    let squareClicked = '';
    const reset = () => {
        clicks = 0;
        clearTimeout(timer); // This prevents the timer (within "handleDateClick") from running
        squareClicked = '';

    }

    const handleDateClick = (e) => {
        // console.log(e.dateStr) // Show the day you clicked on
        clicks++;
        if(clicks===1) {
            squareClicked = e.dateStr;
            timer = setTimeout(() => {
                // After 500 ms, we run the code for singleClick
                alert(`You single clicked on ${e.dateStr}`);
                // After the code is run, we need te reset everything, bcs we need to start all over and expect for single or double click
                reset();
            }, 200);

        } else {
            if(squareClicked===e.dateStr) {
                alert(`You double clicked on ${e.dateStr}`);
                setShow(true);  // On double click on day, we show the Dialog form for the 1st time
                setSelected(e.date)
            }
            reset();
        }

    }
    //--------------------------------------------------------------------------

    //     //-----//------------  Var 1 of handleDateClick -----//---  errors: show message manytimes !?!?!----------------
    // /*
    // Here, we simply add double click event to calendar day
    // */

    // const handleDateClick = (e) => {
    //     // console.log(e.dateStr) // Show the day you clicked on
    //     e.dayEl.addEventListener('dblclick', () => {
    //         alert(`You double clicked on ${e.dateStr}`);

    //         // setOpenDialogBox(true)
    //     });

    // }
    // //--------------------------------------------------------------------------

    // // Here, we make an button from the implicit dayNumberText property
    // const injectCellContent = (args) => {
    //     return (
    //         <div>
    //             {/* Explanations: 
    //             -- "args" is an DEFAULT (!!!) object, loaded by default for every day in the grid.
    //             -- There are 42 cells like this: 
    //             {date: Wed Dec 08 2021 00:00:00 GMT+0200 (Eastern European Standard Time), view: ViewApi, dow: 3, isDisabled: false, isOther: true, …}
    //             -- dayCellContent - is a Content Injection Input (see "Content Injection" in the options table)
    //             */}

    //             {/* {console.log(args)} */} 
    //             <button onClick={()=>showDialog(args.date)}>
    //                 {args.dayNumberText}
    //             </button>
    //         </div>
    //     )
    // }

    
    // const [openDialogBox, setOpenDialogBox] = useState(false) // Initially, don't show the dialog box

    const [date, setDate] = useState(new Date())


    // const showDialog = (date) => {
    //     // alert(`You clicked on ${date}`)
    //     setOpenDialogBox(true)
    //     setDate(date)
    // }


    // This fcn uses eventContent hook and with that we can show the custom props of the events
    const renderEvent = (e) => {
        return <>
            <span>{e.event.title}</span>&nbsp;
            <span> / {e.event.extendedProps.workType}</span>
        
        </>
    }
   

    /*
    AddEvent:
    - the parent of AddEvent, in this case Calendar, controls the displaying of the child by adding or removing the AddEvent component from the DOM.
    - in AddEvent component, in order to close the form (click on Cancel button and click outside of the form) we lift the state up from child to parent (we act by setting: setShow(false)).
    AddEvent component will show only if the open-flag is set to true.
    - "FullCalendar" will provide options (see the options table) as props: plugins, events, dateClick.
    - "dayCellContent" is an option of: Day&Time Display/Day-Cell Render Hooks (see the options table).
    
    */

    const handleAdd = (data) => {
        const event = {start: selected,...data};
        setAllEvents(old => [...old, event]);
        setShow(false);
    }


    return (
        <>
        
        {show && <AddEvent setShow={setShow} handleAdd={handleAdd} />}

        <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            eventContent={renderEvent}
            events={allEvents}
            dateClick={handleDateClick}
            // dayCellContent={injectCellContent}
        />
        {/* <SaveDialog open={openDialogBox} onClose={setOpenDialogBox} date={date}/> */}
        {/* <AddEvent setShow={setShow} /> */}

        </>
    )
}

export default Calendar;