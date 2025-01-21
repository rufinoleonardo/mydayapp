interface DbErrorProps {
  type: string;
  moreInformations: {
    query: string;
    insert: string;
  };
  table: {
    tasks: string;
  };
}

export const ErrorMessages = {
  db: {
    type: "DATABASE ERROR",
    moreInformations: {
      query: "Query failed",
      insert: "Insert failed",
    },
    table: {
      tasks: "TASKS",
    },
  },

  returnDbError: (
    err: DbErrorProps,
    actionType: keyof DbErrorProps["moreInformations"],
    tableName?: keyof DbErrorProps["table"]
  ) => {
    return `${err.type} > ${actionType}${
      tableName ? " > " + tableName + " TABLE" : ""
    }`;
  },
};
