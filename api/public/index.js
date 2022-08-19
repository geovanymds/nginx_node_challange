async function main() {
    const form = document.getElementById("my_form");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        register_user();
    });
}

async function register_user() {
    const name = document.getElementById("name").value;
    const response = await fetch("http://localhost:8080/users",{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
        })
    });
    const json = await response.json();
    const name_list = document.querySelector(".name_list");
    const h1 = document.createElement("h1");
    h1.classList.add("title_list");
    h1.append(`Full Cycle Rocks!`);
    name_list.append(h1);
    json.forEach((element)=>{
        const li = document.createElement("li");
        li.classList.add("name_item");
        li.append(`${element.id} - ${element.name}`);
        name_list.append(li);
    });
    console.log(json);
}

window.onload = main;