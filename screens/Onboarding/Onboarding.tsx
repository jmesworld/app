import React, { memo } from "react";
import { Background, Button, Paragraph } from "../../components";
import { Navigation } from "../../types";
import {View, Text} from "react-native";

type Props = {
    navigation: Navigation;
};

const OnboardingScreen = ({ navigation }: Props) => (
    <Background position="bottom">
        <View style={{
            flexDirection: 'row',
            height: 76,
            width: '100%',
            backgroundColor: '#714FF8',
            // justifyContent: 'center',
            justifyContent: 'flex-end',
            alignItems: 'center',
        }}>
            <Button
                // mode="contained"
                style={{backgroundColor:'#FFF',
                    borderColor:'#000',
                    borderWidth: 5,
                    marginLeft: '10%',
                    width: '37.5%',
                }}
                onPress={() => navigation.navigate("LogUser")}
            >
                <Text style={{color: '#000'}}>LOGIN</Text>
            </Button>
            <Button
                // mode="contained"
                style={{backgroundColor:'#000',
                    marginLeft:"5%",
                    marginRight: '10%',
                    borderColor:'#000',
                    borderWidth: 5,
                    width: '37.5%'
                }}
                onPress={() => navigation.navigate("CreateUser")}>
                <Text style={{color: '#FFF'}}>Register</Text>
            </Button>
        </View>

    </Background>
);

export default memo(OnboardingScreen);
