import React, { useState, useRef, useEffect } from 'react';
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPicker from 'emoji-picker-react';
import Loader from '@/components/common/Loader';

export default function ChatFooter({ activeChat, sendMessage }) {
  const [state, setState] = useState({
    message: "",
    loading: false,
    showEmojiPicker: false
  });

  const emojiPickerRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload
    if (!state.message.trim()) return; // Prevent sending empty messages

    try {
      setState(prev => ({ ...prev, loading: true }));
      await sendMessage(state.message);
      setState(prev => ({ ...prev, message: "", loading: false }));
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleEmojiSelect = (emojiObject) => {
    setState(prev => ({
      ...prev,
      message: prev.message + emojiObject.emoji
    }));
  };

  const toggleEmojiPicker = () => {
    setState(prev => ({ ...prev, showEmojiPicker: !prev.showEmojiPicker }));
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setState(prev => ({ ...prev, showEmojiPicker: false }));
      }
    }

    if (state.showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.showEmojiPicker]);

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg p-2 flex items-center gap-2 max-h-32 relative">
      <div className="flex gap-2 items-center flex-1 bg-gray-100 p-2 rounded-lg">
        <button type="button" className="flex items-center px-2" onClick={toggleEmojiPicker}>
          <FontAwesomeIcon icon={faFaceSmile} />
        </button>

        {state.showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-12 left-2 z-50 bg-white shadow-lg rounded-lg">
            <EmojiPicker
              onEmojiClick={handleEmojiSelect}
              searchDisabled={true} // Removes search bar
              previewConfig={{ showPreview: false }} // Removes preview
            />
          </div>
        )}

        <textarea
          rows={Math.min(state.message.split("\n").length, 3)}
          className="bg-transparent outline-none text-black flex-1 h-auto"
          placeholder="Type a message..."
          value={state.message}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e);
            }
          }}
          onChange={(e) => setState(prev => ({ ...prev, message: e.target.value }))}
        />
      </div>

      <button type="submit" className="bg-custom-orange flex h-full items-center rounded-lg py-2 px-4">
        {state.loading ? <Loader loaderClass="h-5 w-5" /> : <FontAwesomeIcon icon={faPaperPlane} />}
      </button>
    </form>
  );
}
