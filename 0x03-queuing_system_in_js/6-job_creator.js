const kue = require('kue');
const queue = kue.createQueue();

const jobObj = {
    phoneNumber: '0712345678',
    message: 'Welcome!',
};

const jobType = 'push_notification_code';

const job = queue.create(jobType, jobObj).save();

job.on('enqueue', () => console.log(`Notification job created: ${job.id}`))
    .on('complete', () => console.log('Notification job completed'))
    .on('failed', () => console.log('Notification job failed'));
