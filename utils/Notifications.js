import * as Notifications from 'expo-notifications';

const sendScheduleNotification = (content, trigger) => {
    return Notifications.scheduleNotificationAsync({
        content,
        trigger
    })
}
const showNotificationsInForeground = () => {
    return Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true
            }
        }
    });
}
const handleReceivedNotification = (func) => {
    return Notifications.addNotificationReceivedListener(func);
}
const handleClickedNotification = (func) => {
    return Notifications.addNotificationResponseReceivedListener(func);
}
const getPushToken = () => {
    return Notifications.getExpoPushTokenAsync();
}
export { sendScheduleNotification, showNotificationsInForeground, handleClickedNotification, handleReceivedNotification, getPushToken };