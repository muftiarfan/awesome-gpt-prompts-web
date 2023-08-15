$(document).ready(function() {
    // Replace with your CSV file URL
    const csvFileUrl = 'https://raw.githubusercontent.com/muftiarfan/awesome-chatgpt-prompts/main/prompts.csv';
    
    $.get(csvFileUrl, function(data) {
      const parsedData = Papa.parse(data, { header: true }).data;
      const actDropdown = $('#actDropdown');
      
      // Parse CSV data
      const actColumnIndex = 'act';
      const promptColumnIndex = 'prompt';
      
      parsedData.forEach(function(row) {
        const act = row[actColumnIndex];
        
        if (act) {
          actDropdown.append($('<option>', {
            value: act,
            text: act
          }));
        }
      });
      
      // Dropdown change event
      actDropdown.on('change', function() {
        const selectedAct = $(this).val();
        
                // Send custom event to Google Analytics
        gtag('event', 'act_selected', {
                  event_category: 'Dropdown Interaction',
                  event_label: selectedAct
                });
        for (let i = 0; i < parsedData.length; i++) {
          const act = parsedData[i][actColumnIndex];
          const prompt = parsedData[i][promptColumnIndex];
          
          if (act === selectedAct) {
            $('#selectedPrompt').text(prompt);
            //console.log(prompt);
            break; // Exit the loop when the desired prompt is found
          }
        }
      });
    });
	
    // Initialize Clipboard.js
    new ClipboardJS('.copy-code', {
      text: function(trigger) {
        // Send custom event to Google Analytics when text is copied
        const copiedText = trigger.textContent;
        const selectedAct = $("#actDropdown").val();
        gtag('event', 'text_copied', {
          event_category: 'Clipboard Interaction',
          event_label: selectedAct
        });
        
        return copiedText;
      }
    });

  // Show toast notification
  const toast = document.querySelector('.toast');
  const copyMessage = document.querySelector('.copy-message');

  document.querySelectorAll('.copy-code').forEach(code => {
    code.addEventListener('click', function() {
      toast.classList.add('show');
      setTimeout(function() {
        toast.classList.remove('show');
      }, 2000); // Hide toast after 2 seconds
    });

    code.addEventListener('mouseenter', function() {
      copyMessage.style.visibility = 'visible';
    });

    code.addEventListener('mouseleave', function() {
      copyMessage.style.visibility = 'hidden';
    });
  });
  });