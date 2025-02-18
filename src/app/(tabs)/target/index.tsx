import { useAppSelector } from "@/redux/hooks";
import { TargetCard } from "@/ui/components/CardTarget";
import { FloatActionButton } from "@/ui/components/buttons/FloatActionButton";
import { globalStyles } from "@/ui/styles/globalStyles";
import { selectBackgroundColor } from "@/utils/selectBackgroundColors";
import { useTargetViewModel } from "@/viewmodels/target/TargetViewModel";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";

const Target: React.FC = () => {
  const { strings } = useAppSelector((state) => state.language);
  const { targets } = useTargetViewModel();
  const router = useRouter();

  function showDetails(id: string | number) {
    router.push(`target/details/${id}`);
  }

  function navigateToNewTarget() {
    router.push({
      pathname: `target/newTarget`,
    });
  }

  return (
    <View style={globalStyles.pageContainer}>
      <FlatList
        style={{ flex: 1 }}
        data={targets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TargetCard
            title={item.title}
            onCardPress={() => showDetails(item.id)}
            color={selectBackgroundColor(item.id)}
            target={item}
          />
        )}
      />

      <FloatActionButton
        onFabPress={navigateToNewTarget}
        btnText="new target"
      />
    </View>
  );
};

export default Target;
