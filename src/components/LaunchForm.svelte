<script>
    let inputColumns = [{ columnLetter: '', columnName: '' }];
    let outputColumns = { websiteData: '', llmResponse: '' };
    let llmInputs = [''];
  
    // Function to add a new input column
    function addInputColumn() {
      inputColumns = [...inputColumns, { columnLetter: '', columnName: '' }];
    }
  
    // Function to add a new LLM input
    function addLLMInput() {
      llmInputs = [...llmInputs, ''];
    }
  
    // Function to handle the form submission
    function submitForm() {
      // Process and handle the form data
      console.log({ inputColumns, outputColumns, llmInputs });
    }
  </script>
  
  <form on:submit|preventDefault={submitForm}>
    <!-- Input Columns -->
    <h3>Input Columns</h3>
    {#each inputColumns as input, index}
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
        {#if index === inputColumns.length - 1}
          <button type="button" on:click={addInputColumn}>+</button>
        {/if}
      </div>
    {/each}
  
    <!-- Output Columns -->
    <h3>Output Columns</h3>
    <div class="input-group">
      <input
        type="text"
        placeholder="Website Data Output Column"
        bind:value={outputColumns.websiteData}
      />
      <input
        type="text"
        placeholder="LLM Response Output Column"
        bind:value={outputColumns.llmResponse}
      />
    </div>
  
    <!-- LLM Inputs -->
    <h3>LLM Inputs</h3>
    {#each llmInputs as input, index}
      <div class="input-group">
        <input
          type="text"
          placeholder="LLM Input"
          bind:value={llmInputs[index]}
        />
        {#if index === llmInputs.length - 1}
          <button type="button" on:click={addLLMInput}>+</button>
        {/if}
      </div>
    {/each}
  
    <button type="submit">Submit</button>
  </form>
  