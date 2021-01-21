const url = "http://localhost:3000/users"; 
const vm = new Vue({
    el: "#people",
    data: {
        results: []
    },
    mounted() {
        axios.get(url).then(res => {
            this.results = res.data;
        });
    },
    methods:{
        async del(index) {
            let id = this.results[index].id
            this.results.splice(index,1)
            alert('delted ' + id)
            await axios.delete("http://localhost:3000/users/" + id)
        },
        async putRequest(index) {
            
            let id = this.results[index].id;
            var parentDOM = document.getElementById("card-back");
            let inputs = parentDOM.children[index].getElementsByClassName("change_form")[0].getElementsByTagName("input");
            var tempObj = {
                number: inputs[0].value,
                first_name: inputs[1].value,
                last_name: inputs[2].value,
                avatar: inputs[3].value,
            };
            await axios.put(url + "/" + id, tempObj)
            .then(res => {
                alert("Повар был изменен!")
                location.reload();
            })
            .catch(function (error) {
                alert("Неверная информация! Повторите попытку.");
            });
        }
    }
});
