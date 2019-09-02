class UI {
    static updateTableRows(data){
        const UItableBody = document.getElementById('table-body');
        UItableBody.innerHTML = '';
        data.forEach(jobOffer => {
            const nodeTableRow = document.createElement('tr');
            const tableRowTemplate = `
                    <td>${jobOffer.datePosted}</td>
                    <td>${jobOffer.employer}</td>
                    <td>
                        <a href="${jobOffer.jobUrl}">${jobOffer.jobTitle}</a>
                    </td>
                    <td>${jobOffer.address}</td>
            `;
            nodeTableRow.innerHTML = tableRowTemplate;
            UItableBody.appendChild(nodeTableRow)
        })
    }
}



new Promise((resolve, reject)=> {
    fetch('./jsonoutput/jobs.json')
        .then(response=> response.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
}).then(data => UI.updateTableRows(data))
  .catch(error => console.log(error))

//Get job data
setInterval(()=>{
    new Promise((resolve, reject)=> {
        fetch('./jsonoutput/jobs.json')
            .then(response=> response.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
    }).then(data => UI.updateTableRows(data))
      .catch(error => console.log(error))
}, 9000)


