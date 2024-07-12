<script setup>
import Header from '../components/Header.vue'
</script>

<template>
  <main>
    <Header />
    <div class="w-full flex flex-col items-center justify-around">
      <div class="w-2/3 mb-6">
        <p class="font-extrabold text-white mt-20 lg:text-3xl md:text-xl sm:text-l">
          How does MCQs.AI works?
        </p>
        <p class="text-white-64 text-justify mt-3 lg:text-lg md:text-base sm:text-sm">
          MCQs.AI is a sophisticated web application designed to automatically generate multiple-choice questions (MCQs) and True/False questions from a given text using 
          advanced machine learning techniques. The frontend of MCQs.AI is built using Vue.js, a progressive JavaScript framework that allows for a highly responsive and 
          user-friendly interface. Through this interface, users can easily input the theme and the number of questions they wish to generate. They can also choose to include 
          True/False questions in their request.
          <br><br>
          The backend, powered by Express.js, handles the logic of question generation and communicates with the OpenAI API. When a user submits a request, the backend 
          processes the data and decides whether to create an MCQ or a True/False question. It then calls the relevant function, sends a request to the OpenAI API, and 
          generates the question based on the theme provided.
          <br><br>
          Responses from the OpenAI API are parsed and cleaned to ensure readability. The generated questions are then sent back to the frontend for display. This process 
          is designed to be seamless and efficient, providing high-quality educational content with minimal effort.
          <br><br>
          A key feature of MCQs.AI is its ability to customize questions based on a user-specified theme, adding relevance to the content. The option to include both MCQs 
          and True/False questions enhances the variety and engagement of the educational material.
        </p>

        <p class="font-extrabold text-white mt-10 lg:text-3xl md:text-xl sm:text-l">
          Architecture
        </p>
        <img src="../assets/architecture.png" class="mt-5" alt="">
      </div>

      <div class="w-2/3 mb-10 flex justify-between items-center">
        <div class="flex flex-col me-10">
          <p class="font-extrabold text-white mt-20 lg:text-3xl md:text-xl sm:text-l">
            How ChatGPT 3.5 Turbo works?
          </p>
          <p class="text-white-64 text-justify mt-3 lg:text-lg md:text-base sm:text-sm">
            ChatGPT 3.5-turbo is an advanced language model developed by OpenAI. It processes and generates human-like text based on the input it receives, using a 
            transformer-based neural network architecture. The model has been trained on a diverse range of internet text, enabling it to understand and generate text 
            across various topics and styles.
          </p>

          <p class="font-extrabold text-white mt-10 lg:text-3xl md:text-xl sm:text-l">
            And how we prompt tuned it for our need?
          </p>
          <p class="text-white-64 text-justify mt-3 lg:text-lg md:text-base sm:text-sm">
            To tailor ChatGPT 3.5-turbo for MCQs.AI, we prompt-tuned it to generate multiple-choice and True/False questions based on specific themes. Prompt tuning involves 
            creating specific input prompts that guide the model to produce the desired output. For MCQs.AI, we crafted prompts that instruct the model to generate questions 
            in a structured format, specifying the type of question, the theme, and the format of the response. This ensures that the generated questions meet our requirements 
            for educational content, providing relevant and high-quality questions based on the given themes.
          </p>
        </div>

        <div class="flex justify-end mt-12 w-2/3">
          <img src="../assets/chatGPT.png" alt="" class="">
        </div>
          
      </div>
      
    </div>
  </main>
</template>

