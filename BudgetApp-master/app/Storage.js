import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getReceipt() {
    try {

        const jsonValue = await AsyncStorage.getItem('@Receipts4')
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        console.log(e)
    }

    console.log('Done.')

}

export async function storeData(value) {
    try {
        const jsonValue = JSON.stringify(value)

        await AsyncStorage.setItem('@Receipts4', jsonValue)

    } catch (e) {
        // save error
    }

    console.log('Done.')
}

export async function removeEverything() {
    try {
        await AsyncStorage.clear()
        //alert('Storage successfully cleared!')
    } catch (e) {
        alert('Failed to clear the async storage.')
    }
}

