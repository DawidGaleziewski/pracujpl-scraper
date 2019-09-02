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

class HTTPJobs {
    static getJobs(url, callback){
        new Promise((resolve, reject)=> {
            fetch(url)
                .then(response=> response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        }).then(data => callback(data))
          .catch(error => console.log(error))
    }
}


class Filter {
    static byDateDesc(data){
        return data.sort((a, b)=> {
            return new Date(b.datePosted) - new Date(a.datePosted)
        })
    }
}

HTTPJobs.getJobs('./jsonoutput/jobs.json', data => {
    UI.updateTableRows(Filter.byDateDesc(data))
})




//Get job data
setInterval( ()=> {
    HTTPJobs.getJobs('./jsonoutput/jobs.json', data => UI.updateTableRows(Filter.byDateDesc(data)))
}, 9000)


