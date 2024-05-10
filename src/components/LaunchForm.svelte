<script>
    import { getNewExcelFileReference, uploadFileToRef } from "$app/services/firebase_storage";
    // TODO: Add type safety to this
    let directColumns = [{ columnLetter: '', columnName: '' }];
    let customColumns = [{ columnLetter: '', columnName: '', type: '' }];
    let promptColumns = [{prompt: '', outputColumnIndex: '', }];
    let inputFileName = '';
    let outputFileName = '';

    const customTypes = ['Website URL'];

    const customTypeMap = {
      'Website URL': 'website_body',
      'LinkedIn Profile': 'linkedin'
    }
  

    function convertColumnLetterToIndex(columnLetter) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let index = 0;

      for (let i = 0; i < columnLetter.length; i++) {
        const char = columnLetter[i].toUpperCase();
        const charIndex = alphabet.indexOf(char);
        index = index * 26 + (charIndex + 1);
      }

      return index - 1;
    }
    // Function to add a new input column
    function addInputColumn() {
      directColumns = [...directColumns, { columnLetter: '', columnName: '' }];
    }
  
    // Function to add a new LLM input
    function addLLMInput() {
      promptColumns = [...promptColumns, {prompt:'', outputColumnIndex: ''}];
    }

    function addCustomColumn() {
      customColumns = [...customColumns, { columnLetter: '', columnName: '', type: ''}]
    }
  
    // Function to handle the form submission
    function submitForm() {
      // Process and handle the form data
      const file = document.getElementById('fileInput').files[0];
      uploadFileToRef(getNewExcelFileReference('NewFile'), file);
      // hitApi()
      buildRequest()
      // console.log({ inputColumns, outputColumns, llmInputs });
    }

    async function hitApi(){
      const requestData = buildRequest();
      try {
        const response = await fetch('http://localhost:8080/run_request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });

        if (response.ok){
          const data = await response.json();
          console.log('Response:', data);
        }
        else {
          console.error('Request failed:', response.status);
        }
      }
      catch (error) {
        console.error('Request failed:', error);
      }
    }

    function uploadFile() {

    }

    function buildRequest() {
      const request = {
        input_file_name: inputFileName,
        output_file_name: outputFileName,
        direct_fields: [],
        custom_fields: [],
        prompt_fields: []
      };

      // Build direct_fields
      directColumns.forEach((direct) => {
        if (direct.columnLetter && direct.columnName) {
          request.direct_fields.push({
            field_properties: {
              var_name: direct.columnName,
              input_column_index: convertColumnLetterToIndex(direct.columnLetter)
            }
          });
        }
      });

      // Build custom_fields
      customColumns.forEach((custom) => {
        if (custom.columnLetter && custom.columnName) {
          request.custom_fields.push({
            field_properties: {
              var_name: custom.columnName,
              input_column_index: convertColumnLetterToIndex(custom.columnLetter),
            },
            custom_field_request_type: customTypeMap[custom.type] || 'INVALID'
          });
        }
      });

      // Build prompt_fields
      promptColumns.forEach((prompt, index) => {
        if (prompt) {
          request.prompt_fields.push({
            output_col_index: convertColumnLetterToIndex(prompt.outputColumnIndex),
            output_var_name: `llmResponse${index + 1}`,
            order: index,
            prompt: {
              base_text: prompt.prompt
            }
          });
        }
      });
      console.log(request)
      return request
    }
  </script>
  
  <form on:submit|preventDefault={submitForm}>
    <div class="file-names">
      <input type="file" id='fileInput'/>
      <input
        type="text"
        placeholder="Input File Name"
        bind:value={inputFileName}
      />
      <input
        type="text"
        placeholder="Output File Name"
        bind:value={outputFileName}
      />
    </div>
    <!-- Input Columns -->
    <h3>Input Columns</h3>
    {#each directColumns as input, index}
      <div class="input-group">
        <input
          type="text"
          placeholder="Column Letter"
          bind:value={input.columnLetter}
        />
        <input
          type="text"
          placeholder="Column Name"
          bind:value={input.columnName}
        />
        {#if index === directColumns.length - 1}
          <button type="button" on:click={addInputColumn}>+</button>
        {/if}
      </div>
    {/each}
  
    <!-- Output Columns -->
    <h3>Custom Fields</h3>
    {#each customColumns as input, index}
      <div class="input-group">
        <input
          type="text"
          placeholder="Custom Field Column"
          bind:value={input.columnLetter}
        />
        <input
          type="text"
          placeholder="Custom Variable Name"
          bind:value={input.columnName}
        />
        <select bind:value={input.type}>
          <option value="">Select Type</option>
          {#each customTypes as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
        {#if index === customColumns.length - 1}
          <button type="button" on:click={addCustomColumn}>+</button>
        {/if}
      </div>
    {/each}
  
    <!-- LLM Inputs -->
    <h3>LLM Inputs</h3>
    {#each promptColumns as input, index}
      <div class="input-group">
        <input
          type="text"
          placeholder="LLM Input"
          bind:value={input.prompt}
        />
        <input
          type="text"
          placeholder="Output Column Index"
          bind:value={input.outputColumnIndex}
        />
        {#if index === promptColumns.length - 1}
          <button type="button" on:click={addLLMInput}>+</button>
        {/if}
      </div>
    {/each}
  
    <button type="submit">Submit</button>
  </form>
  