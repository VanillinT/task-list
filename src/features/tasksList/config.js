export const headers = [
  {
    label: "Id",
    sortable: true,
    width: 75,
  },
  {
    label: "Username",
    sortable: true,
    width: 125,
  },
  {
    label: "Email",
    sortable: true,
    width: 200,
  },
  {
    label: "Text",
    sortable: false,
    width: 240,
  },
  {
    label: "Status",
    sortable: true,
    width: 100,
  },
];

const getStatus = (edited, done) => ({ edited, done });

export const statusToFieldsMap = {
  0: getStatus(false, false),
  1: getStatus(true, false),
  10: getStatus(false, true),
  11: getStatus(true, true),
};
