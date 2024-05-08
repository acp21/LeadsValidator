<script>
    // TODO: Add type safety to this
    let directColumns = [{ columnLetter: '', columnName: '' }];
    let customColumns = [{ columnLetter: '', columnName: '', type: '' }];
    let promptColumns = [{prompt: '', outputColumnIndex: '', }];

    const customTypes = ['website_body', 'website_url', 'user_input'];
  

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
      buildRequest()
      // console.log({ inputColumns, outputColumns, llmInputs });
    }

    function buildRequest() {
      const request = {
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
              input_column_index: convertColumnLetterToIndex(custom.columnLetter)
            }
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
    }
  </script>
  
  <form on:submit|preventDefault={submitForm}>
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
        {#if index === directColumns.length - 1}
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
  