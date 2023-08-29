import kue from 'kue';
const blacklistedPhoneNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
    const totalProgress = 100;
    job.progress(0, totalProgress);
    if (blacklistedPhoneNumbers.includes(phoneNumber)) {
        done(Error(`Phone Number ${phoneNumber} is blaclisted`));
        return;
    }
    job.progress(50, totalProgress);
    console.log(`sending notification to ${phoneNumber}, with message: ${message}`);
    done();
}
const queue = kue.createQueue();
const jobType = 'push_notification_code_2';

queue.process(jobType, 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});
