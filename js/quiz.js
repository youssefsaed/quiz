class Quiz {
    constructor(Questions) {
        this.Questions = Questions
        this.currentIndex = 0

        document.getElementById('nextBtn').addEventListener('click', this.incrment.bind(this))
        document.getElementById('again').addEventListener('click', this.again.bind(this))
        this.displayQuestion()
        this.score = 0

    }

    incrment() {
        let correct_answer = this.Questions[this.currentIndex].correct_answer
        let userAnswer = Array.from(document.getElementsByName('answer')).find(elm => elm.checked).value
        this.checkAnswer(correct_answer, userAnswer)

        this.currentIndex++
        if (this.Questions.length > this.currentIndex) {
            this.displayQuestion()
        } else {
            $('#quiz').fadeOut(500, () => {
                document.getElementById('scoreNum').innerHTML = this.score
                $('#score').fadeIn(500)
            })
        }
    }

    again() {
        $('#score').fadeOut(500, () => {
            $('#setting').fadeIn(500)
        })
    }
    //randomiz array
    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    displayQuestion() {
        //show question
        document.getElementById('question').innerHTML = this.Questions[this.currentIndex].question
        //array of answers
        let answers = [this.Questions[this.currentIndex].correct_answer, ...this.Questions[this.currentIndex].incorrect_answers]
        this.shuffle(answers)
        //show answers 
        let answersRow = ''
        for (let i = 0; i < answers.length; i++) {
            answersRow += `  <div class="my-3 w-100 d-flex align-items-center justify-content-start">
    <input class="form-check-input me-2"  type="radio" name="answer" id=${answers[i]} value='${answers[i]}'>
    <label class="form-check-label w-100 fw-normal" for=${answers[i]}>
     <div id="${answers[i]}" class="p-2 w-100 shadow-sm rounded-pill ">${answers[i]}</div>
    </label>
  </div>
    `
        } document.getElementById('answersRow').innerHTML = answersRow

        document.getElementById('inc').innerHTML=`${this.currentIndex+1} of ${this.Questions.length}`
    }

    checkAnswer(correct_answer, userAnswer) {
        if (correct_answer == userAnswer) {
            document.getElementById('test').innerHTML = '<i class="fa-solid fa-check"></i>'
            document.getElementById('test').classList.remove('bg-danger')
            document.getElementById('test').classList.add('bg-success')
            $('#test').fadeIn(500).fadeOut(500)

            this.score++
        }
        else {
            document.getElementById('test').innerHTML = '<i class="fa-solid fa-xmark"></i>'
            document.getElementById('test').classList.remove('bg-success')
            document.getElementById('test').classList.add('bg-danger')
            $('#test').fadeIn(500).fadeOut(500)
            document.createElement('audio')
        }

    }

}

export default Quiz