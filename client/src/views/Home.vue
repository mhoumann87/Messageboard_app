<template>
  <div class="container-fluid">
    <div class="row justify-content-sm-center mb-5">
      <div class="col-sm-6">
        <button
          @click="toggleForm = !toggleForm"
          class="btn btn-info mt-3 mb-3"
        >{{toggleForm ? 'Hide form' : 'Show Form' }}</button>
        <form v-if="toggleForm" @submit.prevent="addMessage">
          <fieldset>
            <legend>Add a Message</legend>
            <div v-if="msgErr" class="alert alert-dismissible alert-danger">
              <button @click="msgErr = ''" type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Error {{msgErr}}</strong>
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                v-model="message.username"
                type="text"
                class="form-control"
                id="username"
                placeholder="Enter Username"
              >
            </div>
            <div class="form-group">
              <label for="Subject">Subject</label>
              <input
                type="text"
                v-model="message.subject"
                class="form-control"
                id="subject"
                placeholder="Enter subject"
                required
              >
              <small id="subjectHelp" class="form-text text-muted">Must be filled</small>
            </div>
            <div class="form-group">
              <label for="message">Your Message</label>
              <textarea
                v-model="message.message"
                class="form-control"
                id="message"
                rows="3"
                required
              ></textarea>
              <small id="subjectHelp" class="form-text text-muted">Must be filled</small>
            </div>
            <div class="form-group">
              <label for="imageURL">Image URL</label>
              <input
                type="url"
                v-model="message.imageURL"
                class="form-control"
                id="imageURL"
                placeholder="Enter an Image URL"
              >
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="card col-sm-3" v-for="message in reverseMessages" :key="message._id">
        <img
          v-if="message.imageURL"
          :src="message.imageURL"
          class="card-img-top"
          :alt="message.subject"
        >
        <div class="card-body">
          <h4>{{message.username}}</h4>
          <h5 class="card-title">{{message.subject}}</h5>
          <p class="card-text">{{message.message}}</p>
          <p>
            <small>{{message.created_at}}</small>
          </p>
        </div>
      </div>
    </div>
    <!-- .row -->
  </div>
  <!-- .container-fluid -->
</template>

<script>
// @ is an alias to /src
const API_URL = "http://localhost:3000/messages";
export default {
  name: "home",
  data: () => ({
    messages: [],
    msgErr: "",
    toggleForm: false,
    message: {
      username: "",
      subject: "",
      message: "",
      imageURL: ""
    }
  }),
  computed: {
    reverseMessages() {
      return this.messages.slice().reverse();
    }
  },
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.messages = result;
      });
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(this.message),
        headers: { "content-type": "application/json" }
      })
        .then(response => response.json())
        .then(result => {
          if (result.details) {
            // Error occured
            const msgErr = result.details
              .map(detail => detail.message)
              .join(". ");
            this.msgErr = msgErr;
          } else {
            this.msgErr = "";
            this.toggleForm = false;
            this.messages.push(result);
          }
        });
    }
  }
};
</script>
