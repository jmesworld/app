import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
    async getItem(key: any) {
        return JSON.parse(await AsyncStorage.getItem(key));
    },
    async setItem(key: any, data: any) {
        AsyncStorage.setItem(key, JSON.stringify(data));
    },
    async removeItem(key: any) {
        AsyncStorage.removeItem(key);
    },
};

export default storage;
