/*-----------
| Messaging |
-----------*/

//TODO: Allow users to navigate to the profile of another user by clicking on their name or avatar.
//TODO: Add placeholder text for empty inbox.
//TODO: Add indicator for threads with new messages.
//TODO: On load, display most recent thread.

//FIXME: If user has no messages, frontend goes batshit and starts blowing up the backend with api calls.
//FIXME: Chat window does not display properly when a thread is empty.

//STRETCH: Use React-Spring to make chat look cooler.
//STRETCH: Allow users to search for friends by name.
//STRETCH: Make threads sort properly by latest. Determine latest thread by message timestamps, or update the thread timestamp with every new message.
//STRETCH: Allow users to delete their copy of a thread by removing their user ID from the thread's users array. If the users array ends up empty, the thread is "deleted".

export { default as Messaging } from "./MessagingContainer";
