import Quiz from "./quiz.js"
class Setting {
    constructor() {
        this.category = document.getElementById('category')
        this.difficulty = document.getElementsByName('difficulty')
        this.numberOfQuestion = document.getElementById('numberOfQuestion')
        this.btn = document.getElementById('btn')

        this.btn.addEventListener('click', this.getValue.bind(this))
    }

    async getValue() {
        let category = this.category.value
        let difficulty = Array.from(this.difficulty).find(elm => elm.checked).value
        let numberOfQuestion = this.numberOfQuestion.value
        let API = `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}&difficulty=${difficulty}`
        let Questions = await this.getData(API)
        if (Questions.length) {
            $('#setting').fadeOut(500, () => {
                $('#quiz').fadeIn(500)
            })

            new Quiz(Questions)
        }

    }

    async getData(API) {
        let res = await fetch(API)
        res = await res.json()
        return res.results
    }

}
export default Setting