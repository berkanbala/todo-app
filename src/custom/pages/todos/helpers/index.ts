import { StyleSheet } from "@react-pdf/renderer";

export interface ITodo {
  todo_id: number;
  user_id: number;
  time: string;
  text: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const stylesTable = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 4,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ededed",
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomColor: "#ededed",
    backgroundColor: "#ededed",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    height: 24,
    flexGrow: 1,
    fontSize: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#ededed",
    borderBottomWidth: 1,
    alignItems: "center",
    textAlign: "center",
    height: 24,
    fontSize: 10,
  },
  row: {
    width: 120,
    borderRightColor: "#ededed",
    borderRightWidth: 1,
    textAlign: "center",
  },
});
