export default {
  general_TabBar: {
    report: "Report",
    home: "Home",
    newTask: "New Register",
  },
  screen_Home: {
    dateLabel: "Select a date:",
    resultTitle: "Results for the date",
    noRegisters: "No registers yet.",
    newTaskBtnText: "New task",
    delModalTitle: "ATTENTION: Delete action",
    delModalDesc: `Are you sure you want to delete this item? The action can't be undone.`,
    delModalCancel: "Cancel",
    delModalConfirm: "Confirm",
  },
  screen_Report: {
    yearLabel: "Year",
    monthLabel: "Month",
    yearPlaceholder: "Select the year",
    monthPlaceholder: "Select the month",
    resultsTitle: "Results",
    listTitle: "Showing",
    label_completedTasks: "Completed Tasks",
    label_mistakes: "Mistakes",
    label_completedTargets: "Completed Targets",
  },
  screen_NewTask: {
    descriptionLabel: "Description",
    descriptionPlaceholder: "Description here",
    priorityLabel: "Priority",
    priorityPlaceholder: "Select the priority",
    mistakeLabel: "It was a mistake",
    observationLabel: "Observation",
    observationPlaceholder:
      "If it was a mistake, why did it occur or how did you solve it",
    saveBtnText: "SAVE",
  },
  screen_About: {
    title: "About",
    description:
      "Often, you know where you want to go, and for that, breaking the path into steps is essential. The app Bersaglio (from Italian, meaning 'target') aims to define Goals and Tasks to help achieve them. This is a daily task app based on targets.",
    section0Title: "About the Data",
    section0Desc:
      "App data is stored locally only. The idea is that the app does not need to connect to the internet. In case of deletion, Tasks or Targets are deactivated and cannot be recovered for now.",
    section1Title: "How to use",
    section1Desc:
      "When creating a target, a deadline is defined, which will be used as a parameter for the tasks. Upon completing each task, the task progress bar is updated. The calculation performed is Times Completed / Deadline * 100. As for the Target progress bar, it is updated as the days pass. Stay firm: Repetition leads to perfection.",
    section2Title: "About Reports",
    section2Desc:
      "The reports were designed to provide a monthly overview. Cards displaying the number of completed Tasks, errors, and achieved Targets are shown just below the form. More data will be added in future updates.",
  },
  screen_Targets: {
    title: "Targets",
  },
};
