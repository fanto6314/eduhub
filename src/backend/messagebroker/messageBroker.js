const {PubSub} = require('@google-cloud/pubsub');

const messageBrokerClient = new PubSub({projectId: "eduhub-349808"});
const TOPIC_NAME = "fileUploadNotification";

async function publishFileUploadEvent(payload) {
    const dataBuffer = Buffer.from(JSON.stringify(payload));
    try {
        const messageId = await messageBrokerClient
            .topic(TOPIC_NAME)
            .publishMessage({data: dataBuffer});
        console.log(`Event ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }
}

module.exports = publishFileUploadEvent;
