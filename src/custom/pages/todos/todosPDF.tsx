import { Document, Page, Text, View } from "@react-pdf/renderer";
import { ITodo, stylesTable as styles } from "./helpers";

export const TodosPDF = ({ data }: Props) => {
  console.log(data);
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Todos PDF</Text> 
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.row}>Mission</Text>
            <Text style={styles.row}>Date</Text>
            <Text style={styles.row}>Checked</Text>
          </View>
          {data?.map((item: any) => (
            <View style={styles.tableRow} key={item.text}>
              <Text style={styles.row}>{item.text}</Text>
              <Text style={styles.row}>{item.time}</Text>
              <Text style={styles.row}>
                {item.checked == true ? "Yes" : "No"}
              </Text>
               
            </View>
          ))}
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

interface Props {
  data: ITodo[];
}
