import { useAppSelector } from "@/redux/hooks";
import { FloatActionButton } from "@/ui/components/buttons/FloatActionButton";
import { TargetCard } from "@/ui/components/target/CardTarget";
import { globalStyles } from "@/ui/styles/globalStyles";
import { selectBackgroundColor } from "@/utils/selectBackgroundColors";
import { useTargetViewModel } from "@/viewmodels/target/TargetViewModel";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";

const Target: React.FC = () => {
  const { strings } = useAppSelector((state) => state.language);
  const { targets, setTargets } = useTargetViewModel();
  const router = useRouter();

  function showDetails(id: string | number) {
    router.push(`target/details/${id}`);
  }

  function handleDeleteTask(id: number) {
    const targetsRemained = targets.filter((target) => target.id != id);
    setTargets(targetsRemained);
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
            id={item.id}
            title={item.title}
            onCardPress={() => showDetails(item.id)}
            color={selectBackgroundColor(item.id)}
            target={item}
            onTargetLongPress={handleDeleteTask}
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
