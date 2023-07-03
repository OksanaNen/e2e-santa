Feature: User login in secret santa website and create a box then adds participants and starts the toss

  Scenario: userAuthor logs in and create a box successfuly
    Given userAuthor is on secret santa login page
    When userAuthor logs in as "deminaon@gmail.com" and "qwerty" 
    Then userAuthor is created a box

  Scenario: userAuthor adds participants (creates invite link)
    Given userAuthor is in a box
    When userAuthor creates invite link and gets links 
    Then Clear cookies

  Scenario: users approve an invite link
    Given user is on secret santa login page
    When users logs in as "<login>" and "<password>" + users approved
    Then Clear cookies again
  Examples: 
    |login|password|
    |deminaon+1@gmail.com|qwerty|
    |deminaon+2@gmail.com|qwerty|
    |deminaon+3@gmail.com|qwerty|
  
  Scenario: userAuthor starts the toss and the toss completed successfuly
    Given userAuthor logs again in as "deminaon@gmail.com" and "qwerty" 
    When userAuthor starts the toss
    Then the toss completed

  Scenario: delete a box
    Given visit website
    When userAuthor logs in for delete as "deminaon@gmail.com" and "qwerty"
    Then delete a box