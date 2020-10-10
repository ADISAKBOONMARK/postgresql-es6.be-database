class OutputOnDbProperty {
    constructor() {
        this.status = null;
        this.data = null;

        this.userMessage = null;
        this.userMoreInfo = null;

        this.developerMessage = null;
        this.developerMoreInfo = null;
    }

    async success({ data, userMessage, developerMessage }) {
        this.status = true;
        this.data = data;
        this.userMessage = userMessage;
        this.developerMessage = developerMessage;
    }

    async fail({ userMessage, developerMessage }) {
        this.status = false;
        this.userMessage = userMessage;
        this.developerMessage = developerMessage;
    }
}

export default OutputOnDbProperty;
