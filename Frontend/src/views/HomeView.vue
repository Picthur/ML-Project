<script>
import Header from "../components/Header.vue";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  components: {
    Header,
  },
  data() {
    return {
      counter: 1,
      multiChoice: false,
      questionsType: "Single choice questions",
      truFalse: false,
      loading: false,
      MCQ: [],
      answer: false,
    };
  },
  mounted() {
    this.answer = false;
  },
  methods: {
    downloadPDF() {  // Doesn't work
      
      var doc = new jsPDF();

      var htmlContent = document.getElementById("contentToConvert");

      var options = {
        format: "a4",
        orientation: "portrait",
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
      };

      doc.fromHTML(htmlContent, options);

      doc.save("MCQ_" + this.theme + ".pdf");
    },

    incrementCounter() {
      this.counter++;
    },
    decrementCounter() {
      if (this.counter > 1) {
        this.counter--;
      }
    },
    selectedMultiChoice() {
      this.multiChoice = !this.multiChoice;
      if (this.multiChoice === true) {
        this.questionsType = "Multi choice questions";
      } else {
        this.questionsType = "Single choice questions";
      }
    },
    selectedTruFalse() {
      this.truFalse = !this.truFalse;
    },
    createMcq() {
      const theme = this.theme;
      const number = this.counter;
      const truefalse = this.truFalse;

      if (!theme) {
        alert("Please enter a theme");
        return;
      }
      this.answer = false;
      this.loading = true;

      axios
        .post("http://localhost:3000/api/createMCQ", {
          theme: theme,
          number: number,
          truefalse: truefalse,
        })
        .then((response) => {
          this.loading = false;
          this.MCQ = response.data;
          console.log("MCQ created:", response.data);
        })
        .catch((error) => {
          this.loading = false;
          console.error("Error creating MCQ:", error);
        });
    },
  },
};
</script>

<template>
  <main>
    <Header />
    <div class="w-full flex justify-around">
      <div class="w-1/2 px-10">
        <p
          class="text-center text-white-60 mt-20 lg:text-xl md:text-l sm:text-md font-normal"
        >
          Create a MCQ based on a theme in minute !
        </p>
        <h3 class="text-xl font-bold text-white mt-7">I want a MCQ about..</h3>
      </div>
    </div>
    <div class="flex flex-col items-center mt-3">
      <form action="" class="w-3/5 flex flex-col items-center">
        <label
          class="input input-bordered bg-white flex items-center gap-2 rounded-3xl w-4/5"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="AI Icon" clip-path="url(#clip0_956_102)">
              <path
                id="Vector"
                d="M8 3L10.5 8.5L16 11L10.5 13.5L8 19L5.5 13.5L0 11L5.5 8.5L8 3ZM8 7.83L7 10L4.83 11L7 12L8 14.17L9 12L11.17 11L9 10L8 7.83ZM18 8L16.74 5.26L14 4L16.74 2.75L18 0L19.25 2.75L22 4L19.25 5.26L18 8ZM18 22L16.74 19.26L14 18L16.74 16.75L18 14L19.25 16.75L22 18L19.25 19.26L18 22Z"
                fill="url(#paint0_linear_956_102)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_956_102"
                x1="0"
                y1="0"
                x2="26.5261"
                y2="10.0304"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.158668" stop-color="#F76A4B" />
                <stop offset="0.60652" stop-color="#A24AE7" />
                <stop offset="0.891362" stop-color="#4859F3" />
              </linearGradient>
              <clipPath id="clip0_956_102">
                <rect width="22" height="22" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <input
            v-model="theme"
            type="text"
            class="grow ml-6 text-black"
            placeholder="Animals Football or any theme you like..."
          />
        </label>

        <div class="flex flex-row justify-center items-center mt-3 w-full">
          <p class="text-white text-xl font-bold">Filter applied:</p>

          <div
            class="border border-orange-color rounded-[20px] text-orange-color w-1/4 flex flex-row justify-center items-center text-orange-color ms-3"
          >
            <button
              @click.prevent="decrementCounter"
              class="btn btn-outline btn-sm border-0 text-[#F6AD37] hover:text-[#F6AD37] hover:bg-[#F6AD37] hover:bg-opacity-10"
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4255 10.0754C15.2795 10.2215 15.0797 10.3137 14.8491 10.3137L6.149 10.3137C5.70323 10.3137 5.33432 9.94479 5.33432 9.49902C5.33432 9.05326 5.70323 8.68435 6.149 8.68435L14.8491 8.68435C15.2948 8.68435 15.6638 9.05326 15.6638 9.49902C15.6638 9.72959 15.5715 9.92942 15.4255 10.0754Z"
                  fill="#F19E38"
                />
              </svg>
            </button>

            <p class="text-xl text-center font-bold lg:px-3 my-2">
              {{ counter }} questions
            </p>

            <button
              @click.prevent="incrementCounter"
              class="btn btn-outline btn-sm border-0 text-[#F6AD37] hover:text-[#F6AD37] hover:bg-[#F6AD37] hover:bg-opacity-10"
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0755 14.4255C10.9294 14.5715 10.7296 14.6637 10.499 14.6637C10.0533 14.6637 9.68437 14.2948 9.68437 13.8491L9.68437 5.14898C9.68437 4.70321 10.0533 4.33431 10.499 4.33431C10.9448 4.33431 11.3137 4.70321 11.3137 5.14898L11.3137 13.8491C11.3214 14.0719 11.2215 14.2795 11.0755 14.4255Z"
                  fill="#F19E38"
                />
                <path
                  d="M15.4255 10.0754C15.2795 10.2215 15.0797 10.3137 14.8491 10.3137L6.149 10.3137C5.70323 10.3137 5.33432 9.94479 5.33432 9.49902C5.33432 9.05326 5.70323 8.68435 6.149 8.68435L14.8491 8.68435C15.2948 8.68435 15.6638 9.05326 15.6638 9.49902C15.6638 9.72959 15.5715 9.92942 15.4255 10.0754Z"
                  fill="#F19E38"
                />
              </svg>
            </button>
          </div>

          <button
            :class="{
              'btn btn-outline border border-orange-color text-orange-color rounded-[20px] ms-3  hover:bg-white hover:bg-opacity-5 hover:text-orange-color':
                truFalse === true,
              'btn btn-outline border border-white-32 rounded-[20px] ms-3 text-white-32  hover:bg-bright-orange hover:bg-opacity-5 hover:text-white-32':
                truFalse === false,
            }"
            @click="selectedTruFalse"
            type="button"
          >
            <div v-if="truFalse === true">
              <svg
                width="25"
                height="25"
                viewBox="3 3 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4341 14.4341C11.9881 16.8801 8.0118 16.8801 5.5658 14.4341C3.1198 11.9881 3.1198 8.01185 5.5658 5.56585C8.0118 3.11985 11.9881 3.11985 14.4341 5.56585C16.8801 8.01185 16.8801 11.9881 14.4341 14.4341ZM6.18452 6.18457C4.08088 8.28821 4.08088 11.7118 6.18452 13.8154C8.28816 15.9191 11.7117 15.9191 13.8154 13.8154C15.919 11.7118 15.919 8.28821 13.8154 6.18457C11.7117 4.08093 8.28816 4.08093 6.18452 6.18457Z"
                  fill="#F19E38"
                />
                <path
                  d="M10.3093 12.644C10.2309 12.7224 10.1237 12.7719 9.99993 12.7719C9.76069 12.7719 9.5627 12.5739 9.5627 12.3346L9.5627 7.66537C9.5627 7.42613 9.76069 7.22814 9.99993 7.22814C10.2392 7.22814 10.4372 7.42613 10.4372 7.66537L10.4372 12.3346C10.4413 12.4542 10.3877 12.5656 10.3093 12.644Z"
                  fill="#F19E38"
                />
                <path
                  d="M12.6439 10.3094C12.5656 10.3877 12.4583 10.4372 12.3346 10.4372L7.6653 10.4372C7.42606 10.4372 7.22807 10.2392 7.22807 10C7.22807 9.76076 7.42606 9.56277 7.6653 9.56277L12.3346 9.56277C12.5738 9.56277 12.7718 9.76076 12.7718 10C12.7718 10.1237 12.7223 10.231 12.6439 10.3094Z"
                  fill="#F19E38"
                />
              </svg>
            </div>

            <div v-if="truFalse === false">
              <svg
                width="25"
                height="25"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 13.2708C4.04083 13.2708 1.22917 10.4592 1.22917 6.99999C1.22917 3.54082 4.04083 0.729156 7.5 0.729156C10.9592 0.729156 13.7708 3.54082 13.7708 6.99999C13.7708 10.4592 10.9592 13.2708 7.5 13.2708ZM7.5 1.60416C4.525 1.60416 2.10417 4.02499 2.10417 6.99999C2.10417 9.97499 4.525 12.3958 7.5 12.3958C10.475 12.3958 12.8958 9.97499 12.8958 6.99999C12.8958 4.02499 10.475 1.60416 7.5 1.60416Z"
                  fill="white"
                  fill-opacity="0.32"
                />
                <path
                  d="M5.84917 9.08832C5.73833 9.08832 5.6275 9.04749 5.54 8.95999C5.37083 8.79082 5.37083 8.51082 5.54 8.34166L8.84167 5.03999C9.01083 4.87082 9.29083 4.87082 9.46 5.03999C9.62917 5.20916 9.62917 5.48916 9.46 5.65832L6.15833 8.95999C6.07667 9.04749 5.96 9.08832 5.84917 9.08832Z"
                  fill="white"
                  fill-opacity="0.32"
                />
                <path
                  d="M9.15083 9.08832C9.04 9.08832 8.92917 9.04749 8.84167 8.95999L5.54 5.65832C5.37083 5.48916 5.37083 5.20916 5.54 5.03999C5.70917 4.87082 5.98917 4.87082 6.15833 5.03999L9.46 8.34166C9.62917 8.51082 9.62917 8.79082 9.46 8.95999C9.3725 9.04749 9.26167 9.08832 9.15083 9.08832Z"
                  fill="white"
                  fill-opacity="0.32"
                />
              </svg>
            </div>

            <p class="text-xl mx-2">True/false</p>
          </button>
        </div>

        <button
          v-if="!loading"
          @click.prevent="createMcq"
          class="btn rounded-[15px] animated-background bg-gradient-to-r from-red-400 via-purple-500 to-indigo-600 border border-bg-color hover:border-white-32 text-white text-xl font-bold mt-10 w-1/4 h-16"
          type="button"
        >
          GENERATE MCQ
        </button>
        <div class="mt-10" v-else>
          <div class="flex justify-around w-full">
            <span
              class="loading loading-spinner text-info animated-background bg-gradient-to-r from-red-400 via-purple-500 to-indigo-600"
            ></span>
          </div>
          <p
            class="w-20 mt-3 text-center text-cyan-400 font-bold text-xl animated-text"
          >
            Loading
          </p>
        </div>
      </form>

      <div class="w-3/5 mb-10">
        <div
          class="border border-white-32 rounded-xl mt-20 mb-5 pb-10 relative"
        >
          <button
            v-if="this.MCQ.length"
            v-on:click="this.answer = !this.answer"
            class="btn absolute top-4 right-4 btn-success text-white font-bold"
          >
            See Answers
          </button>

          <div class="flex flex-row justify-start items-center mx-10 mt-5">
            <div>
              <svg
                width="57"
                height="57"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  fill="white"
                  fill-opacity="0.06"
                />
                <g clip-path="url(#clip0_956_126)">
                  <path
                    d="M17 12L19.5 17.5L25 20L19.5 22.5L17 28L14.5 22.5L9 20L14.5 17.5L17 12ZM17 16.83L16 19L13.83 20L16 21L17 23.17L18 21L20.17 20L18 19L17 16.83ZM27 17L25.74 14.26L23 13L25.74 11.75L27 9L28.25 11.75L31 13L28.25 14.26L27 17ZM27 31L25.74 28.26L23 27L25.74 25.75L27 23L28.25 25.75L31 27L28.25 28.26L27 31Z"
                    fill="url(#paint0_linear_956_126)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_956_126"
                    x1="9"
                    y1="9"
                    x2="35.5261"
                    y2="19.0304"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.158668" stop-color="#F76A4B" />
                    <stop offset="0.60652" stop-color="#A24AE7" />
                    <stop offset="0.891362" stop-color="#4859F3" />
                  </linearGradient>
                  <clipPath id="clip0_956_126">
                    <rect
                      width="22"
                      height="22"
                      fill="white"
                      transform="translate(9 9)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p class="text-xl font-bold text-white ms-5">Here is your MCQ :</p>
          </div>
          <div class="flex flex-col justify-center items-center mt-10 px-4">
            <div
              v-for="q in MCQ"
              :key="q"
              class="w-full mt-2"
              id="contentToConvert"
            >
              <div
                v-if="q.type == 'MCQ'"
                class="text-white border border-white rounded border-1 p-2 w-full"
              >
                <div>
                  <h3>Question: {{ q.Question }}</h3>
                </div>
                <div class="flex mt-2">
                  <div
                    class="border rounded w-4 h-4"
                    :class="{ 'bg-red-400': this.answer && q.Response == 'A' }"
                  ></div>
                  <p class="ms-2">{{ q.A }}</p>
                </div>
                <div class="flex">
                  <div
                    class="border rounded w-4 h-4"
                    :class="{ 'bg-red-400': this.answer && q.Response == 'B' }"
                  ></div>
                  <p class="ms-2">{{ q.B }}</p>
                </div>
                <div class="flex" v-if="q.C">
                  <div
                    class="border rounded w-4 h-4"
                    :class="{ 'bg-red-400': this.answer && q.Response == 'C' }"
                  ></div>
                  <p class="ms-2">{{ q.C }}</p>
                </div>
                <div class="flex" v-if="q.D">
                  <div
                    class="border rounded w-4 h-4"
                    :class="{ 'bg-red-400': this.answer && q.Response == 'D' }"
                  ></div>
                  <p class="ms-2">{{ q.D }}</p>
                </div>
              </div>
              <div
                v-if="q.type == 'truefalse'"
                class="text-white border border-white rounded border-1 p-2 w-full"
              >
                <div>
                  <h3>Question: {{ q.Question }}</h3>
                </div>
                <div class="flex">
                  <div
                    class="border rounded w-4 h-4"
                    :class="{
                      'bg-red-400': this.answer && q.Response == 'true',
                    }"
                  ></div>
                  <p class="ms-2">True</p>
                </div>
                <div class="flex">
                  <div
                    class="border rounded w-4 h-4"
                    :class="{
                      'bg-red-400': this.answer && q.Response == 'false',
                    }"
                  ></div>
                  <p class="ms-2">False</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Hide download button since functionality is not working -->
        <!-- <div class="flex mb-10" v-if="this.MCQ.length">
          <button
            v-on:click="this.downloadPDF()"
            class="btn mx-2 bg-gradient-to-r from-red-400 via-purple-500 to-indigo-600 border border-bg-color hover:border-white flex flex-row justify-center items-center"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.875 11.5833C3.31222 11.5833 3.66667 11.9378 3.66667 12.375V15.5416C3.66667 15.7516 3.75007 15.953 3.89854 16.1014C4.04701 16.2499 4.24837 16.3333 4.45833 16.3333H15.5417C15.7516 16.3333 15.953 16.2499 16.1015 16.1014C16.2499 15.953 16.3333 15.7516 16.3333 15.5416V12.375C16.3333 11.9378 16.6878 11.5833 17.125 11.5833C17.5622 11.5833 17.9167 11.9378 17.9167 12.375V15.5416C17.9167 16.1715 17.6664 16.7756 17.221 17.221C16.7756 17.6664 16.1716 17.9166 15.5417 17.9166H4.45833C3.82844 17.9166 3.22435 17.6664 2.77895 17.221C2.33355 16.7756 2.08333 16.1715 2.08333 15.5416V12.375C2.08333 11.9378 2.43777 11.5833 2.875 11.5833Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.48187 7.85687C5.79104 7.54771 6.29229 7.54771 6.60146 7.85687L10 11.2554L13.3985 7.85687C13.7077 7.54771 14.209 7.54771 14.5181 7.85687C14.8273 8.16604 14.8273 8.66729 14.5181 8.97646L10.5598 12.9348C10.2506 13.244 9.74937 13.244 9.44021 12.9348L5.48187 8.97646C5.17271 8.66729 5.17271 8.16604 5.48187 7.85687Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2.08331C10.4372 2.08331 10.7917 2.43775 10.7917 2.87498V12.375C10.7917 12.8122 10.4372 13.1666 10 13.1666C9.56278 13.1666 9.20834 12.8122 9.20834 12.375V2.87498C9.20834 2.43775 9.56278 2.08331 10 2.08331Z"
                fill="white"
              />
            </svg>

            <p class="text-white text-xl font-bold">Download MCQ</p>
          </button>
          <button
            class="btn mx-2 bg-gradient-to-r from-red-400 via-purple-500 to-indigo-600 border border-bg-color hover:border-white flex flex-row justify-center items-center"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.875 11.5833C3.31222 11.5833 3.66667 11.9378 3.66667 12.375V15.5416C3.66667 15.7516 3.75007 15.953 3.89854 16.1014C4.04701 16.2499 4.24837 16.3333 4.45833 16.3333H15.5417C15.7516 16.3333 15.953 16.2499 16.1015 16.1014C16.2499 15.953 16.3333 15.7516 16.3333 15.5416V12.375C16.3333 11.9378 16.6878 11.5833 17.125 11.5833C17.5622 11.5833 17.9167 11.9378 17.9167 12.375V15.5416C17.9167 16.1715 17.6664 16.7756 17.221 17.221C16.7756 17.6664 16.1716 17.9166 15.5417 17.9166H4.45833C3.82844 17.9166 3.22435 17.6664 2.77895 17.221C2.33355 16.7756 2.08333 16.1715 2.08333 15.5416V12.375C2.08333 11.9378 2.43777 11.5833 2.875 11.5833Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.48187 7.85687C5.79104 7.54771 6.29229 7.54771 6.60146 7.85687L10 11.2554L13.3985 7.85687C13.7077 7.54771 14.209 7.54771 14.5181 7.85687C14.8273 8.16604 14.8273 8.66729 14.5181 8.97646L10.5598 12.9348C10.2506 13.244 9.74937 13.244 9.44021 12.9348L5.48187 8.97646C5.17271 8.66729 5.17271 8.16604 5.48187 7.85687Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10 2.08331C10.4372 2.08331 10.7917 2.43775 10.7917 2.87498V12.375C10.7917 12.8122 10.4372 13.1666 10 13.1666C9.56278 13.1666 9.20834 12.8122 9.20834 12.375V2.87498C9.20834 2.43775 9.56278 2.08331 10 2.08331Z"
                fill="white"
              />
            </svg>

            <p class="text-white text-xl font-bold">Download Correction</p>
          </button>
        </div> -->
      </div>
    </div>
  </main>
</template>

<style>
@keyframes animatedGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animated-background {
  background-size: 200% auto;
  animation: animatedGradient 3s ease infinite;
}

.animated-text {
  background: linear-gradient(
    to right,
    rgb(248, 113, 113),
    rgb(168, 85, 247),
    rgb(79, 70, 229)
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: animatedGradient 3s ease infinite;
}
</style>
