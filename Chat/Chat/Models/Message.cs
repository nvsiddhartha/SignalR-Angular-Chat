using System;

namespace Chat.Models
{
    public class Message
    {
        public Message(
            string user,
            string content,
            bool isStatus)
        {
            User = user;
            Content = content;
            IsStatus = isStatus;
            SentDateTime = DateTime.Now.ToUniversalTime().ToString();
        }

        public string User { get; set; }

        public string Content { get; set; }

        public bool IsStatus { get; set; }

        public string SentDateTime { get; set; }
    }
}
