import react from "react";
import ScheduleListItem from "./scheduleListItem";

const ScheduleListAccordion = () => {
  {
    updateDays();
  }
  return (
    <View style={styles.content}>
      {days.map((propDays) => {
        return (
          <View key={Math.random() * 1000}>
            <Text style={styles.date}>{propDays}</Text>
            {scheduleData.map((item) => {
              if (item.day === propDays) {
                return (
                  <View key={item.key}>
                    <ScheduleListItem
                      item={item}
                      pressHandler={() =>
                        navigation.navigate("ListItemDetails", {
                          item,
                          pressHandlerDeleteItem,
                          pressHandlerExtendLecture,
                          addScheduleListItem,
                        })
                      }
                    />
                  </View>
                );
              }
            })}
          </View>
        );
      })}
      ;
    </View>
  );
};

export default ScheduleListAccordion;
