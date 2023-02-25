# Objective

Use **ChatGPT** to filter out comments that contain just emoticons words or emojis and comments that are responsive, text, verbal, written, and remarks.

*Alternative: Could use a map/array of emoticons and filter out the comments using the map/array.*

Examples of Emoticons Comment:
- lol
- lmao
- 😀
- Congrats :)

## Run

`yarn start` or `npm start`

## Packages

- TypeScript

## Problems

- Handling a large a database of comments.
  - Keeping a database of all the processed comments by giving each comment object with boolean value of emoticon or not.
- Getting a more accuracy result when process the comments.

# Chat GPT
## Prompt with Examples

**Prompt:** 

    Does this sentence, `{sentence}`, contain an emoji? Yes or No?
<table style="margin-bottom: 40px">
  <tr>
    <th>#</th>
    <th>Example</th>
    <th>Response</th>
  </tr>
  <tr>
    <th>1</th>
    <td>😀</td>
    <td>Yes</td>
  </tr>
  <tr>
    <th>2</th>
    <td>What an amazing video. I think they shouldn't done this.</td>
    <td>No</td>
  </tr>
  <tr>
    <th>3</th>
    <td>Congratulation 👍</td>
    <td>Yes</td>
  </tr>
</table>

**Prompt:** 

    Is this sentence, `{sentence}`, emoticon? Yes or No.
<table>
  <tr>
    <th>#</th>
    <th>Example</th>
    <th>Response</th>
  </tr>
  <tr>
    <th>1</th>
    <td>Lol</td>
    <td>Yes</td>
  </tr>
  <tr>
    <th>2</th>
    <td>Hello there. I think you should do that too.</td>
    <td>No</td>
  </tr>
  <tr>
    <th>3</th>
    <td>Congratulation 👍</td>
    <td>Yes</td>
  </tr>
  <tr>
    <th>4</th>
    <td>Hello there. I think you should do that too. 😀</td>
    <td>No</td>
  </tr>
</table>

**Prompt** 

    Anaylze the string, `{string}` to see if the contain strings that are not emoticon. Response with just a Yes or No

**Prompt** 

    Content: Emoticon sentence is a sentence where there is a majority of emojis, emoticons, or abbreviation slang terms in the sentence.
    
    Given an array of objects, determine if the 'body' key of each object is an emoticon sentence. Return a boolean array with the same length as the input array, where each element is true if the corresponding object is an emoticon sentence, and false otherwise.
    
    Array:
    ${JSON.stringify(data.comments, null, 2)}
    Output:

Result: Boolean array to tell if this sentence is an emoticon sentence or not.