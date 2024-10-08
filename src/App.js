import React, { useState, useEffect } from 'react';

export default function Component() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState('');
  const [lastPostTime, setLastPostTime] = useState(0); // Track the time of the last post
  const [nextId, setNextId] = useState(123456793); // Initial ID, you might fetch this from the server if needed

  // Fetch comments when the component mounts
  useEffect(() => {
    fetch('/api/comments')
      .then(res => res.json())
      .then(data => {
        // Adjust the timestamps to the user's local time
        const adjustedReplies = data.map(reply => ({
          ...reply,
          timestamp: new Date(reply.timestamp).toLocaleString(),
        }));
        setReplies(adjustedReplies);
        // Update nextId based on the highest ID from fetched comments
        const maxId = Math.max(...data.map(reply => parseInt(reply._id, 10)));
        setNextId(maxId + 1);
      })
      .catch(err => console.error('Error fetching comments:', err));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if 10 seconds have passed since the last post
    const now = Date.now();
    if (now - lastPostTime < 10000) {
      setError('You must wait 10 seconds between posts');
      return;
    }

    if (!comment.trim()) {
      setError('Comment is required');
      return;
    }

    const newReply = {
      name: name.trim() || 'Anonymous',
      comment: comment.trim(),
      isSpoiler,
      timestamp: new Date().toLocaleString(),
      _id: nextId.toString(), // Use the counter for the ID
    };

    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReply),
    })
      .then((res) => res.json())
      .then((data) => {
        const adjustedData = {
          ...data,
          timestamp: new Date(data.timestamp).toLocaleString(),
        };
        setReplies([...replies, adjustedData]);
        setName('');
        setComment('');
        setIsSpoiler(false);
        setLastPostTime(now); // Update the last post time
        setNextId(nextId + 1); // Increment the ID counter
      })
      .catch((err) => console.error('Error submitting comment:', err));
  };

  return (
    <>
      <div className="bg-[#EEF2FF] min-h-screen font-sans text-[13px] text-[#000000]">
        {/* Header */}
        <header className="bg-[#D1D5EE] border-b border-[#B7C5D9] p-1">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex space-x-4">
              <a href="https://x.com/findtruthsol" className="text-[#34345C] font-bold">[Twitter/X]</a>
              <a href="https://t.me/TruthPortalsol" className="text-[#34345C] font-bold">[Telegram]</a>
              <a href="https://pump.fun/CmesUZPFTjVNZmJsUTbShRCh2vSWtiKXVvxCmutgpump" className="text-[#34345C] font-bold">[Pump]</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-[#34345C] font-bold">[a]</a>
              <a href="#" className="text-[#34345C] font-bold">[b]</a>
              <a href="#" className="text-[#34345C] font-bold">[c]</a>
              <a href="#" className="text-[#34345C] font-bold hidden md:block">[d]</a>
              <a href="#" className="text-[#34345C] font-bold hidden md:block">[e]</a>
              <a href="#" className="text-[#34345C] font-bold hidden md:block">[f]</a>
              <a href="#" className="text-[#34345C] font-bold hidden md:block">[g]</a>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto p-2">
          <div className="bg-[#D6DAF0] p-2 mb-4">
            <h1 className="text-[#AF0A0F] font-bold text-lg">/truth/ - Conspiracy</h1>
            <p className="text-xs mt-1">CA: CmesUZPFTjVNZmJsUTbShRCh2vSWtiKXVvxCmutgpump</p>
          </div>

          {/* Thread */}
          <div className="bg-[#D6DAF0] p-2 mb-4">
            {/* Original Post */}
            <div className="p-2 bg-[#F0E0D6]">
              <div className="flex items-start space-x-2">
                <img
                  src="/truth.png"
                  alt="Post image"
                  className="w-[100px] md:w-[150px] border border-[#D9BFB7]" />
                <div>
                  <div>
                    <span className="font-bold text-[#117743]">Anonymous</span>
                    <span className="text-xs"> 09/16/24(Mon)3:34:56 No.123456789</span>
                  </div>
                  <div className="text-xs mt-1">File: <span className="text-[#0000EE]">truth.jpg</span> (39 KB, 250x250)</div>
                  <p className="mt-2 whitespace-pre-wrap">
                    Hey /truth/,

                    after Trump getting almost eliminated for the 2nd time I started to think...wtf is really going on?
                    What do you think? From Epstein to COVID to now. The last couple years have felt like a real fuckery, pardon my french.
                    I'm putting together a team to dive in to every conspiracy to ever live and find out the truth. Care to join?
                  </p>
                </div>
              </div>
            </div>

            {/* Replies */}
            <div className="mt-2 space-y-2">
              <div className="p-2 bg-[#F0E0D6]">
                <div>
                  <span className="font-bold text-[#117743]">Anonymous</span>
                  <span className="text-xs"> 09/16/24(Mon)3:35:03 No.123456790</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap">
                  I'm in. My wife just can't know
                </p>
              </div>

              <div className="p-2 bg-[#F0E0D6]">
                <div className="flex items-start space-x-2">
                  <img
                    src="/chem.png"
                    alt="Reply image"
                    className="w-[100px] h-[100px] border border-[#D9BFB7]" />
                  <div>
                    <div>
                      <span className="font-bold text-[#117743]">Anonymous</span>
                      <span className="text-xs"> 09/16/24(Mon)3:35:56 No.123456791</span>
                    </div>
                    <div className="text-xs mt-1">File: <span className="text-[#0000EE]">chemtrails.png</span> (15 KB, 100x100)</div>
                    <p className="mt-2 whitespace-pre-wrap">
                      If you want real answers, look into chemtrails. The government is spraying chemicals in the sky to control us.

                      Wake up, sheeple
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-[#F0E0D6]">
                <div>
                  <span className="font-bold text-[#117743]">Anonymous</span>
                  <span className="text-xs"> 09/16/24(Mon)3:35:56 No.123456792</span>
                </div>
                <p className="mt-2 whitespace-pre-wrap">
                  Chemtrails are just the tip of the iceberg. Bill Gates and the cabal made my cousin gay from the mosquitoes
                </p>
              </div>

              {/* New replies */}
              {replies.map((reply) => (
                <div key={reply._id} className="p-2 bg-[#F0E0D6]">
                  <div>
                    <span className="font-bold text-[#117743]">{reply.name}</span>
                    <span className="text-xs"> {reply.timestamp} No.{reply._id}</span>
                  </div>
                  <p className={`mt-2 whitespace-pre-wrap ${reply.isSpoiler ? 'bg-black text-black hover:bg-transparent hover:text-inherit' : ''}`}>
                    {reply.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Form */}
          <div className="bg-[#D6DAF0] p-2">
            <h3 className="font-bold mb-2 text-[#0F0C5D]">Reply to Thread No.123456789</h3>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <form className="space-y-2" onSubmit={handleFormSubmit}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name (optional)"
                  className="w-1/3 bg-[#F0E0D6] border-[#B7C5D9] p-1" />
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment (required)"
                className="w-full h-24 bg-[#F0E0D6] border-[#B7C5D9] p-1"
                required />
              <div className="flex items-center space-x-2">
                <button
                  type="submit"
                  className="bg-[#0F0C5D] text-white p-1 hover:bg-[#0A0A3F] disabled:bg-gray-400"
                  disabled={!comment.trim()}
                >
                  Post
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="spoiler"
                  checked={isSpoiler}
                  onChange={(e) => setIsSpoiler(e.target.checked)} />
                <label htmlFor="spoiler" className="text-[#34345C]">Spoiler</label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className='w-full flex justify-center py-2 bg-[#D6DAF0] text-xs px-[5%]'>
        <div className='text-center'>All trademarks and copyrights on this page are owned by their respective parties. Images uploaded are the responsibility of the Poster. Comments are owned by the Poster.</div>
      </div>
    </>
  );
}