import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface IoniconsIcons {
  back: keyof typeof Ionicons.glyphMap;
}

interface EntypoIcons {
  info: keyof typeof Entypo.glyphMap;
  home: keyof typeof Entypo.glyphMap;
}

interface MaterialIconsIcons {
  report: keyof typeof MaterialIcons.glyphMap;
  addTask: keyof typeof MaterialIcons.glyphMap;
}

interface FoundationIcons {
  target: keyof typeof Foundation.glyphMap;
}

interface FontAwesome5Icons {
  plus: keyof typeof FontAwesome5.glyphMap;
}

interface FontAwesomeIcons {
  check: keyof typeof FontAwesome.glyphMap;
}

interface appIconsProps {
  ionicons: IoniconsIcons;
  entypo: EntypoIcons;
  materialcons: MaterialIconsIcons;
  foundation: FoundationIcons;
  fontAwesome5: FontAwesome5Icons;
  fontAwesome: FontAwesomeIcons;
  antDesign: AntDesignIcons;
}

interface AntDesignIcons {
  close: keyof typeof AntDesign.glyphMap;
}

export const appIcons: appIconsProps = {
  ionicons: {
    back: "chevron-back-circle-sharp",
  },
  entypo: {
    info: "info-with-circle",
    home: "home",
  },
  materialcons: {
    report: "description",
    addTask: "add-task",
  },
  foundation: {
    target: "target",
  },
  fontAwesome: {
    check: "check-square",
  },
  fontAwesome5: {
    plus: "plus",
  },
  antDesign: {
    close: "closecircle",
  },
};
