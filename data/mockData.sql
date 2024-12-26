INSERT INTO mail_entity (id_mail,"type", "from", "to", "subject", "text") VALUES
('001', 'sent', 'ME', 'bob.martin@example.com', 'Invitation à la réunion', 'Salut Bob, je t invite à la réunion de demain à 10h.'),
('002', 'receive', 'bob.martin@example.com', 'clara.moreau@example.com', 'Document important', 'Clara, voici le rapport que tu m as demandé.'),
('003',  'received', 'clara.moreau@example.com', 'david.lefevre@example.com', 'Re : Réunion de demain', 'David, est-ce que tu seras présent demain à la réunion ?'),
('004', 'sent', 'ME', 'eve.thomas@example.com', 'Demande d information', 'Eve, pourrais-tu m envoyer les fichiers du projet ? Merci.' ),
('005', 'received', 'eve.thomas@example.com', 'alice.dupont@example.com', 'Suivi projet', 'Alice, j ai mis à jour le planning du projet. Peux-tu le vérifier ?');
