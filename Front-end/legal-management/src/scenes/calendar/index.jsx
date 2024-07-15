import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { caseManagementUrl } from "../../config";
import {
  generateAndExecuteMutation,
  fetchDataEngine,
} from "../../data/Axios/DynamicService";
import Swal from "sweetalert2";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [sidebarEvents, setSidebarEvents] = useState([]);
  const caseId = 1; // Adjust the caseId as needed

  // Fetch tasks and transform them into calendar events
  useEffect(() => {
    async function fetchTasks() {
      try {
        const returnFields = [
          "id",
          "caseId",
          "asigneeId",
          "description",
          "isActive",
          "statusFlag",
          "createdBy",
          "createdDate",
          "updatedBy",
          "updatedDate",
          "companyId",
          "company",
        ];
        const inputFields = { caseId };
        const tasks = await fetchDataEngine(
          "allCaseTasksByColumnValues",
          "caseTask",
          inputFields,
          returnFields,
          caseManagementUrl.uri
        );
        const events = tasks.map((task) => ({
          id: task.id,
          title: task.description,
          start: task.createdDate,
          end: task.updatedDate,
          allDay: true,
        }));
        setSidebarEvents(events);
        setCurrentEvents(events);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your Task");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr || selected.startStr,
        allDay: selected.allDay,
      };

      // Add the new event to the calendar
      calendarApi.addEvent(newEvent);

      // Send the new event to the backend
      createTask(newEvent);
    }
  };
  // const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userIdFromSession = parseInt(decodedToken.Id);
  const createTask = async (newEvent) => {
    try {
      const mutationData = {
        caseId,
        description: newEvent.title,
        createdBy: userIdFromSession, // Replace with the actual user ID
        createdDate: newEvent.start,
        updatedBy: userIdFromSession, // Replace with the actual user ID
        updatedDate: newEvent.end,
        companyId: 1, // Replace with the actual company ID
      };

      const response = await generateAndExecuteMutation(
        "createCaseTask",
        mutationData,
        "newCaseTask",
        caseManagementUrl.uri
      );

      if (Object.values(response)[0] != null) {
        // Append the new event to the sidebar
        setSidebarEvents((prevEvents) => [...prevEvents, newEvent]);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Task has been created successfully.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while creating the task. Please try again later.",
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
      // Optionally, you can also handle removing the event from the database here
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Tasks</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            //eventClick={handleEventClick}
            events={currentEvents} // Use currentEvents to display events
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
