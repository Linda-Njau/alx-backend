const createPushNotificationsJobs = require('./8-job');
const kue = require('kue');

const queue = kue.createQueue();
const { expect } = require('chai');

describe('createPushNotificationsJobs', () => {
    before(() => queue.testMode.enter());
    afterEach(() => queue.testMode.clear());
    after(() => queue.testMode.exit());

    it('returns error if jobs is not an array', () => {
        const jobs = '0712345678';
        expect(() => createPushNotificationsJobs(jobs, queue)).to.throw(
            Error, 'jobs is not an array');
        });
    it('creates and adds two new jobs to the queue', () => {
        const jobs = [
            {
                phoneNumber: '0712345678',
                message: 'This is the code 1234 to verify you account',
            },
            {
                phoneNumber: '074536789',
                message: 'This is the code 4567 to verify your account',
            },
        ];
        createPushNotificationsJobs(jobs, queue);
        expect(queue.testMode.jobs.length).to.equal(2);

        expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[0].data).to.deep.equal({
            phoneNumber: '0712345678',
            message: 'This is the code 1234 to verify you account',
        });

        expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[1].data).to.deep.equal({
            phoneNumber: '074536789',
            message: 'This is the code 4567 to verify your account',
        });
        
    });
    });
