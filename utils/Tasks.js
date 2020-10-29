import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { TASK_LOAD_CURRENCIES } from './constants';

const registerDailyDefaultTask = (func) => {
    TaskManager.isTaskRegisteredAsync(TASK_LOAD_CURRENCIES).then(result => {
        if (!result) {
            BackgroundFetch.setMinimumIntervalAsync(1);
            TaskManager.defineTask(TASK_LOAD_CURRENCIES, () => {
                func();
                return BackgroundFetch.Result.NewData;
            });
        }
    })
}

const removeAllTasks = () => TaskManager.unregisterAllTasksAsync();
const setDailyBackgroundFetch = async () => {
    const isRegistred = await TaskManager.isTaskRegisteredAsync(TASK_LOAD_CURRENCIES);
    if (!isRegistred)
        return;
    await BackgroundFetch.getStatusAsync();
    const options = {
        minimumInterval: 1440
    }
    await BackgroundFetch.registerTaskAsync(TASK_LOAD_CURRENCIES, options);
}

export { registerDailyDefaultTask, setDailyBackgroundFetch, removeAllTasks }