const kue = require('kue');

const queue = kue.createQueue();

function sendNotification(phoneNumber, message) {
    console.log(`send notification to ${phoneNumber} with message ${message}`);
}

const jobType = 'push_notification_code';

queue.process(jobType, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message);
    done();
});
