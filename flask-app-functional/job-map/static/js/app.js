console.log('app.js working')

//   reference:
//https://www.codebyamir.com/blog/populate-a-select-dropdown-list-with-json
let dropdown = $('#selDataset');

  dropdown.empty();
  
  dropdown.append('<option selected="true" disabled>Choose Job Title</option>');
  dropdown.prop('selectedIndex', 0);
  
  const url = '/jobs';
  
  // Populate dropdown with list of provinces
  $.getJSON(url, function (data) {
    $.each(data, function (key, entry) {
      dropdown.append($('<option></option>').attr('onClick', "reply_click(this.id)").attr('value', entry.title).text(entry.label));
    })
  });

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    console.log(newSample)
  }