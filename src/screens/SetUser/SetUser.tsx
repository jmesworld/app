import React, { memo } from "react";
import { Background, Button, Paragraph } from "../../components";
import { Navigation } from "../../types";

type Props = {
    navigation: Navigation;
};

const SetUserScreen = ({ navigation }: Props) => (
    <Background position="bottom">
        <Paragraph bold>Companion Wallet for JMESWorld</Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate("Set Pin")}>
            Connect to account
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("Set Pin")}>
            Create Account
        </Button>
    </Background>
);

export default memo(SetUserScreen);
