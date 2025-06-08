export const TASK_TYPES = ["Story", "Task"];

export const TASK_TAGS = [
  { value: "Epic", label: "Epic" },
  { value: "Bug", label: "Bug" },
  { value: "Tech Debt", label: "Tech Debt" },
  { value: "High Priority", label: "High Priority" },
  { value: "Documentation", label: "Documentation" },
  { value: "Testing", label: "Testing" },
];

export const TASK_STATUSES = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "In Review", label: "In Review" },
  { value: "Done", label: "Done" },
];

// Sample users for demo - replace with actual user data
export const SAMPLE_USERS = [
  { value: "1", label: "John Doe", avatar: "JD" },
  { value: "2", label: "Jane Smith", avatar: "JS" },
  { value: "3", label: "Mike Johnson", avatar: "MJ" },
];

export const INITIAL_FORM_STATE = {
  title: "",
  type: "Story",
  tags: [],
  status: TASK_STATUSES[0],
  storyPoints: "",
  sprint: "",
  assignees: [],
  blockedBy: [],
  acceptanceCriteria: [],
  description: "",
  attachments: [],
};

export const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: "rgb(31, 41, 55)",
    borderColor: state.isFocused ? "rgb(99, 102, 241)" : "rgb(55, 65, 81)",
    boxShadow: state.isFocused ? "0 0 0 1px rgb(99, 102, 241)" : "none",
    "&:hover": {
      borderColor: "rgb(75, 85, 99)",
    },
  }),
  menu: (base) => ({
    ...base,
    background: "rgb(31, 41, 55)",
    border: "1px solid rgb(55, 65, 81)",
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused
      ? "rgb(55, 65, 81)"
      : state.isSelected
      ? "rgb(99, 102, 241)"
      : "transparent",
    "&:active": {
      background: "rgb(67, 76, 94)",
    },
  }),
  input: (base) => ({
    ...base,
    color: "white",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  multiValue: (base) => ({
    ...base,
    background: "rgb(55, 65, 81)",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "rgb(156, 163, 175)",
    "&:hover": {
      background: "rgb(75, 85, 99)",
      color: "white",
    },
  }),
};

export const modalAnimations = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    initial: { scale: 0.95, y: 20 },
    animate: { scale: 1, y: 0 },
    exit: { scale: 0.95, y: 20 },
    transition: { type: "spring", duration: 0.5 },
  },
  title: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  section: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  acceptanceCriteria: {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  },
  button: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },
  closeButton: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
};
