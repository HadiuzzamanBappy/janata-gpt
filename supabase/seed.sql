-- ==============================================================================
-- REALISTIC SEED DATA SCRIPT (15 Users, Teams, Bots, RAG, Telemetry)
-- ==============================================================================
DO $$
DECLARE
  v_kb_id uuid;
  v_doc_id uuid;
BEGIN

  -- User: Alice Smith
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('952d677a-7d8a-49c5-a6ab-f2b0883afc0e', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'alice@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Alice Smith"}') ON CONFLICT DO NOTHING;

  -- User: Bob Johnson
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('621e4cc2-6802-47d9-aa23-43783e633502', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'bob@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Bob Johnson"}') ON CONFLICT DO NOTHING;

  -- User: Charlie Brown
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('7037b605-116b-49b3-892e-e2a1ae31de03', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'charlie@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Charlie Brown"}') ON CONFLICT DO NOTHING;

  -- User: Diana Prince
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('f4ed3aea-0659-4336-a62b-ac23bead76a5', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'diana@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Diana Prince"}') ON CONFLICT DO NOTHING;

  -- User: Evan Wright
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('9c84b675-daf2-462b-9af2-c7f521e997dc', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'evan@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Evan Wright"}') ON CONFLICT DO NOTHING;

  -- User: Fiona Gallagher
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('eb6404f7-69c7-439d-be14-286388bb7f83', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'fiona@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Fiona Gallagher"}') ON CONFLICT DO NOTHING;

  -- User: George Miller
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('e11fae6e-c518-4436-b41f-91355c238cb6', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'george@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"George Miller"}') ON CONFLICT DO NOTHING;

  -- User: Hannah Abbott
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('bc0cf359-4874-4aeb-a44f-e0570ff1a546', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'hannah@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Hannah Abbott"}') ON CONFLICT DO NOTHING;

  -- User: Ian Malcolm
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('d5b47623-9f07-4308-8057-7a97779c5607', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'ian@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Ian Malcolm"}') ON CONFLICT DO NOTHING;

  -- User: Julia Roberts
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('d27f23b8-a008-497b-96c3-6d0b555ef756', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'julia@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Julia Roberts"}') ON CONFLICT DO NOTHING;

  -- User: Kevin Hart
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('4f6fb916-21ac-47fe-9c83-48e82cf8c587', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'kevin@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Kevin Hart"}') ON CONFLICT DO NOTHING;

  -- User: Laura Palmer
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('2ea01caf-25b0-4d56-a4fe-659c70d98390', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'laura@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Laura Palmer"}') ON CONFLICT DO NOTHING;

  -- User: Michael Scott
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('d044534b-f038-47a7-83d5-d99f4013366e', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'michael@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Michael Scott"}') ON CONFLICT DO NOTHING;

  -- User: Nina Simone
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('79e7a1ec-09fa-499b-b877-4201c7f7ff65', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'nina@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Nina Simone"}') ON CONFLICT DO NOTHING;

  -- User: Oscar Isaac
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES ('40b35f75-f0e2-470c-93fd-97355289e327', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'oscar@example.com', extensions.crypt('password123', extensions.gen_salt('bf')), now(), '{"full_name":"Oscar Isaac"}') ON CONFLICT DO NOTHING;

  INSERT INTO public.org_organizations (id, name, slug, owner_id) VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'Acme Corp', 'acme-corp', 'bc0cf359-4874-4aeb-a44f-e0570ff1a546') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'bc0cf359-4874-4aeb-a44f-e0570ff1a546', 'owner') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '79e7a1ec-09fa-499b-b877-4201c7f7ff65', 'member') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'e11fae6e-c518-4436-b41f-91355c238cb6', 'member') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '4f6fb916-21ac-47fe-9c83-48e82cf8c587', 'member') ON CONFLICT DO NOTHING;

  INSERT INTO public.saas_subscriptions (organization_id, plan_id, provider_subscription_id, status, current_period_end)
  SELECT '99442f8d-dda4-4b21-952b-bfe9572d6cd1', id, 'sub_acme-corp', 'active', now() + interval '30 days' FROM public.saas_plans WHERE name = 'ChatGPT Team' ON CONFLICT DO NOTHING;

  INSERT INTO public.org_organizations (id, name, slug, owner_id) VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', 'Tech Innovators', 'tech-innovators', '9c84b675-daf2-462b-9af2-c7f521e997dc') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', '9c84b675-daf2-462b-9af2-c7f521e997dc', 'owner') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', 'f4ed3aea-0659-4336-a62b-ac23bead76a5', 'member') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', '79e7a1ec-09fa-499b-b877-4201c7f7ff65', 'member') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', '621e4cc2-6802-47d9-aa23-43783e633502', 'member') ON CONFLICT DO NOTHING;

  INSERT INTO public.saas_subscriptions (organization_id, plan_id, provider_subscription_id, status, current_period_end)
  SELECT '5a6ed645-540e-49a7-8594-17f40532fdb2', id, 'sub_tech-innovators', 'active', now() + interval '30 days' FROM public.saas_plans WHERE name = 'ChatGPT Team' ON CONFLICT DO NOTHING;

  INSERT INTO public.org_organizations (id, name, slug, owner_id) VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', 'Design Studio', 'design-studio', 'eb6404f7-69c7-439d-be14-286388bb7f83') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', 'eb6404f7-69c7-439d-be14-286388bb7f83', 'owner') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', '9c84b675-daf2-462b-9af2-c7f521e997dc', 'member') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', 'bc0cf359-4874-4aeb-a44f-e0570ff1a546', 'member') ON CONFLICT DO NOTHING;
  INSERT INTO public.org_members (organization_id, user_id, role) VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', 'd27f23b8-a008-497b-96c3-6d0b555ef756', 'member') ON CONFLICT DO NOTHING;

  INSERT INTO public.saas_subscriptions (organization_id, plan_id, provider_subscription_id, status, current_period_end)
  SELECT 'cc269e52-2cd2-4502-a9ca-c904446482d9', id, 'sub_design-studio', 'active', now() + interval '30 days' FROM public.saas_plans WHERE name = 'ChatGPT Team' ON CONFLICT DO NOTHING;

  INSERT INTO public.bot_chatbots (id, organization_id, name, slug, description, system_prompt, status)
  VALUES ('729f60e0-4802-47ba-8e69-615ac28a1e35', '99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'Code Reviewer', 'code-reviewer', 'A helpful bot.', 'You review code.', 'published') ON CONFLICT DO NOTHING;

  INSERT INTO public.bot_chatbots (id, organization_id, name, slug, description, system_prompt, status)
  VALUES ('883d83b7-ce27-4c91-9ee1-356b2f18b481', '5a6ed645-540e-49a7-8594-17f40532fdb2', 'Marketing Copywriter', 'copywriter', 'A helpful bot.', 'You write ads.', 'published') ON CONFLICT DO NOTHING;

  INSERT INTO public.bot_chatbots (id, organization_id, name, slug, description, system_prompt, status)
  VALUES ('1c71040d-c53d-44e7-b136-ad086e351a57', 'cc269e52-2cd2-4502-a9ca-c904446482d9', 'Support Agent', 'support', 'A helpful bot.', 'You help customers.', 'published') ON CONFLICT DO NOTHING;

  INSERT INTO public.bot_tools (id, chatbot_id, name, description, schema_json)
  VALUES ('1de55aa9-23b8-425b-ae6d-87b566ffeca9', '729f60e0-4802-47ba-8e69-615ac28a1e35', 'run_linter', 'Runs ESLint.', '{"type":"object"}') ON CONFLICT DO NOTHING;

  INSERT INTO public.bot_tools (id, chatbot_id, name, description, schema_json)
  VALUES ('c4a9c404-9ff3-400f-a97e-099f15cadd1c', '1c71040d-c53d-44e7-b136-ad086e351a57', 'lookup_order', 'Looks up order status.', '{"type":"object"}') ON CONFLICT DO NOTHING;

  v_kb_id := gen_random_uuid();
  INSERT INTO public.rag_knowledge_bases (id, organization_id, chatbot_id, name) VALUES (v_kb_id, '99442f8d-dda4-4b21-952b-bfe9572d6cd1', '729f60e0-4802-47ba-8e69-615ac28a1e35', 'Code Docs') ON CONFLICT DO NOTHING;
  
  v_doc_id := gen_random_uuid();
  INSERT INTO public.rag_documents (id, knowledge_base_id, name) VALUES (v_doc_id, v_kb_id, 'Style Guide.md') ON CONFLICT DO NOTHING;

  INSERT INTO public.rag_document_chunks (document_id, knowledge_base_id, content, embedding)
  VALUES (v_doc_id, v_kb_id, 'Always use camelCase for variables.', (SELECT array_agg(random())::extensions.vector(1536) FROM generate_series(1, 1536))) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('c809715d-6b22-4628-8abb-a60c0ae9b022', '729f60e0-4802-47ba-8e69-615ac28a1e35', '99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'eb6404f7-69c7-439d-be14-286388bb7f83', 'Chat about Code Reviewer') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('f5dfed74-0f41-4f10-8b22-435af97c994f', 'c809715d-6b22-4628-8abb-a60c0ae9b022', 'user', 'Hello Code Reviewer', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('81fb8d0b-fa31-40bc-ace0-12a5bbe5badc', 'c809715d-6b22-4628-8abb-a60c0ae9b022', 'f5dfed74-0f41-4f10-8b22-435af97c994f', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '729f60e0-4802-47ba-8e69-615ac28a1e35', 'c809715d-6b22-4628-8abb-a60c0ae9b022', '81fb8d0b-fa31-40bc-ace0-12a5bbe5badc', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;
  INSERT INTO public.chat_feedback (organization_id, conversation_id, message_id, user_id, rating) VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'c809715d-6b22-4628-8abb-a60c0ae9b022', '81fb8d0b-fa31-40bc-ace0-12a5bbe5badc', 'eb6404f7-69c7-439d-be14-286388bb7f83', 1) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('e7d085c1-31a2-44be-a2e1-6b745d597b31', '1c71040d-c53d-44e7-b136-ad086e351a57', 'cc269e52-2cd2-4502-a9ca-c904446482d9', 'f4ed3aea-0659-4336-a62b-ac23bead76a5', 'Chat about Support Agent') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('cc00903f-e238-4ae9-b9ef-860567ebe675', 'e7d085c1-31a2-44be-a2e1-6b745d597b31', 'user', 'Hello Support Agent', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('53a0169f-5b0d-4413-9ee3-df7a62ac709b', 'e7d085c1-31a2-44be-a2e1-6b745d597b31', 'cc00903f-e238-4ae9-b9ef-860567ebe675', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', '1c71040d-c53d-44e7-b136-ad086e351a57', 'e7d085c1-31a2-44be-a2e1-6b745d597b31', '53a0169f-5b0d-4413-9ee3-df7a62ac709b', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('33da35d5-d8b4-4f3b-a4f6-7d60d1362bbe', '729f60e0-4802-47ba-8e69-615ac28a1e35', '99442f8d-dda4-4b21-952b-bfe9572d6cd1', '7037b605-116b-49b3-892e-e2a1ae31de03', 'Chat about Code Reviewer') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('e0ac54e1-b882-44f9-a4fe-3507b6bbe681', '33da35d5-d8b4-4f3b-a4f6-7d60d1362bbe', 'user', 'Hello Code Reviewer', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('206cbeb4-ff1f-4e69-8e98-410a1c8af6ce', '33da35d5-d8b4-4f3b-a4f6-7d60d1362bbe', 'e0ac54e1-b882-44f9-a4fe-3507b6bbe681', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '729f60e0-4802-47ba-8e69-615ac28a1e35', '33da35d5-d8b4-4f3b-a4f6-7d60d1362bbe', '206cbeb4-ff1f-4e69-8e98-410a1c8af6ce', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('88635042-1903-4f0b-8f95-085a84de6758', '729f60e0-4802-47ba-8e69-615ac28a1e35', '99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'eb6404f7-69c7-439d-be14-286388bb7f83', 'Chat about Code Reviewer') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('4a32b974-de1d-499d-ba5c-0e9b982b01c5', '88635042-1903-4f0b-8f95-085a84de6758', 'user', 'Hello Code Reviewer', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('28b97e2b-8c3a-4aaa-9c4a-5bf125783bda', '88635042-1903-4f0b-8f95-085a84de6758', '4a32b974-de1d-499d-ba5c-0e9b982b01c5', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '729f60e0-4802-47ba-8e69-615ac28a1e35', '88635042-1903-4f0b-8f95-085a84de6758', '28b97e2b-8c3a-4aaa-9c4a-5bf125783bda', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('14147d7a-3f64-49a0-a330-6750fdec8f35', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '5a6ed645-540e-49a7-8594-17f40532fdb2', 'd044534b-f038-47a7-83d5-d99f4013366e', 'Chat about Marketing Copywriter') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('c7968eaf-0304-4c33-8a50-4510999298aa', '14147d7a-3f64-49a0-a330-6750fdec8f35', 'user', 'Hello Marketing Copywriter', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('76267b6d-b349-4f73-a10e-05bd6fe0e9cc', '14147d7a-3f64-49a0-a330-6750fdec8f35', 'c7968eaf-0304-4c33-8a50-4510999298aa', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '14147d7a-3f64-49a0-a330-6750fdec8f35', '76267b6d-b349-4f73-a10e-05bd6fe0e9cc', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('09cf7ba3-bf43-47b8-8b69-ea82fa84f09a', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '5a6ed645-540e-49a7-8594-17f40532fdb2', '952d677a-7d8a-49c5-a6ab-f2b0883afc0e', 'Chat about Marketing Copywriter') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('43d47723-e89c-425c-989b-78974e80a96d', '09cf7ba3-bf43-47b8-8b69-ea82fa84f09a', 'user', 'Hello Marketing Copywriter', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('eb5074ad-a03b-45b3-ba18-bedc0618a9cc', '09cf7ba3-bf43-47b8-8b69-ea82fa84f09a', '43d47723-e89c-425c-989b-78974e80a96d', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '09cf7ba3-bf43-47b8-8b69-ea82fa84f09a', 'eb5074ad-a03b-45b3-ba18-bedc0618a9cc', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('e12199b6-e68f-49f7-93bb-d717ed9098f0', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '5a6ed645-540e-49a7-8594-17f40532fdb2', 'bc0cf359-4874-4aeb-a44f-e0570ff1a546', 'Chat about Marketing Copywriter') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('f5159ca8-d1ff-42f8-8293-57c4151f643d', 'e12199b6-e68f-49f7-93bb-d717ed9098f0', 'user', 'Hello Marketing Copywriter', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('20225ca6-efc5-48cb-bc98-fd78ba591b0c', 'e12199b6-e68f-49f7-93bb-d717ed9098f0', 'f5159ca8-d1ff-42f8-8293-57c4151f643d', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', '883d83b7-ce27-4c91-9ee1-356b2f18b481', 'e12199b6-e68f-49f7-93bb-d717ed9098f0', '20225ca6-efc5-48cb-bc98-fd78ba591b0c', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;
  INSERT INTO public.chat_feedback (organization_id, conversation_id, message_id, user_id, rating) VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', 'e12199b6-e68f-49f7-93bb-d717ed9098f0', '20225ca6-efc5-48cb-bc98-fd78ba591b0c', 'bc0cf359-4874-4aeb-a44f-e0570ff1a546', 1) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('b5fef934-f247-4407-805f-0800365ecfda', '729f60e0-4802-47ba-8e69-615ac28a1e35', '99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'f4ed3aea-0659-4336-a62b-ac23bead76a5', 'Chat about Code Reviewer') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('1abc6bdb-532b-4fc0-9713-fc21fdf5f5e7', 'b5fef934-f247-4407-805f-0800365ecfda', 'user', 'Hello Code Reviewer', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('1c970bf0-85f5-4677-80e3-6a66a452f6ff', 'b5fef934-f247-4407-805f-0800365ecfda', '1abc6bdb-532b-4fc0-9713-fc21fdf5f5e7', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '729f60e0-4802-47ba-8e69-615ac28a1e35', 'b5fef934-f247-4407-805f-0800365ecfda', '1c970bf0-85f5-4677-80e3-6a66a452f6ff', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('e356dc5a-2945-4f40-8a37-b839ebaa4e0c', '1c71040d-c53d-44e7-b136-ad086e351a57', 'cc269e52-2cd2-4502-a9ca-c904446482d9', '4f6fb916-21ac-47fe-9c83-48e82cf8c587', 'Chat about Support Agent') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('a7ba4f7e-b92a-4f07-9ade-268a2d0f1b2e', 'e356dc5a-2945-4f40-8a37-b839ebaa4e0c', 'user', 'Hello Support Agent', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('a2fd33d1-16de-48d1-8f13-c20e8d566632', 'e356dc5a-2945-4f40-8a37-b839ebaa4e0c', 'a7ba4f7e-b92a-4f07-9ade-268a2d0f1b2e', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', '1c71040d-c53d-44e7-b136-ad086e351a57', 'e356dc5a-2945-4f40-8a37-b839ebaa4e0c', 'a2fd33d1-16de-48d1-8f13-c20e8d566632', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;
  INSERT INTO public.chat_feedback (organization_id, conversation_id, message_id, user_id, rating) VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', 'e356dc5a-2945-4f40-8a37-b839ebaa4e0c', 'a2fd33d1-16de-48d1-8f13-c20e8d566632', '4f6fb916-21ac-47fe-9c83-48e82cf8c587', 1) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('52ba2bbd-2ba6-4d29-a4d9-75b521efd67c', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '5a6ed645-540e-49a7-8594-17f40532fdb2', 'd044534b-f038-47a7-83d5-d99f4013366e', 'Chat about Marketing Copywriter') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('c1b72c23-0763-4878-97ca-93472307f79a', '52ba2bbd-2ba6-4d29-a4d9-75b521efd67c', 'user', 'Hello Marketing Copywriter', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('47502767-3b97-4e87-b5da-ba6c9fe27114', '52ba2bbd-2ba6-4d29-a4d9-75b521efd67c', 'c1b72c23-0763-4878-97ca-93472307f79a', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '52ba2bbd-2ba6-4d29-a4d9-75b521efd67c', '47502767-3b97-4e87-b5da-ba6c9fe27114', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('45f69071-5d77-49af-aa66-5fd839db0138', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '5a6ed645-540e-49a7-8594-17f40532fdb2', '621e4cc2-6802-47d9-aa23-43783e633502', 'Chat about Marketing Copywriter') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('c4d01b69-7da2-413e-b1c5-3954a83f5c07', '45f69071-5d77-49af-aa66-5fd839db0138', 'user', 'Hello Marketing Copywriter', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('5cac95bb-25e2-4fec-b8e2-b591345d2434', '45f69071-5d77-49af-aa66-5fd839db0138', 'c4d01b69-7da2-413e-b1c5-3954a83f5c07', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', '883d83b7-ce27-4c91-9ee1-356b2f18b481', '45f69071-5d77-49af-aa66-5fd839db0138', '5cac95bb-25e2-4fec-b8e2-b591345d2434', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('2121640e-3d36-4e1a-b653-803b12a3904f', '1c71040d-c53d-44e7-b136-ad086e351a57', 'cc269e52-2cd2-4502-a9ca-c904446482d9', '40b35f75-f0e2-470c-93fd-97355289e327', 'Chat about Support Agent') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('ee204298-f054-43f9-bd3f-bb9738514241', '2121640e-3d36-4e1a-b653-803b12a3904f', 'user', 'Hello Support Agent', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('dc520deb-d18c-4413-895a-f3a207b48c4c', '2121640e-3d36-4e1a-b653-803b12a3904f', 'ee204298-f054-43f9-bd3f-bb9738514241', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', '1c71040d-c53d-44e7-b136-ad086e351a57', '2121640e-3d36-4e1a-b653-803b12a3904f', 'dc520deb-d18c-4413-895a-f3a207b48c4c', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('26d6c827-7438-4a8b-98ee-83f48045ffe9', '729f60e0-4802-47ba-8e69-615ac28a1e35', '99442f8d-dda4-4b21-952b-bfe9572d6cd1', '79e7a1ec-09fa-499b-b877-4201c7f7ff65', 'Chat about Code Reviewer') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('ee91c467-0e55-4887-968c-9d6f1aa7a09c', '26d6c827-7438-4a8b-98ee-83f48045ffe9', 'user', 'Hello Code Reviewer', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('f28b20b9-749a-42f4-9de5-6bee614abd3f', '26d6c827-7438-4a8b-98ee-83f48045ffe9', 'ee91c467-0e55-4887-968c-9d6f1aa7a09c', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '729f60e0-4802-47ba-8e69-615ac28a1e35', '26d6c827-7438-4a8b-98ee-83f48045ffe9', 'f28b20b9-749a-42f4-9de5-6bee614abd3f', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;
  INSERT INTO public.chat_feedback (organization_id, conversation_id, message_id, user_id, rating) VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '26d6c827-7438-4a8b-98ee-83f48045ffe9', 'f28b20b9-749a-42f4-9de5-6bee614abd3f', '79e7a1ec-09fa-499b-b877-4201c7f7ff65', 1) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('084a5b2b-d793-4718-b056-c71f913db09b', '729f60e0-4802-47ba-8e69-615ac28a1e35', '99442f8d-dda4-4b21-952b-bfe9572d6cd1', '621e4cc2-6802-47d9-aa23-43783e633502', 'Chat about Code Reviewer') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('95648e26-0aeb-4687-a410-683cc06f1060', '084a5b2b-d793-4718-b056-c71f913db09b', 'user', 'Hello Code Reviewer', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('e9deb423-1323-41b9-8daf-89843203a59b', '084a5b2b-d793-4718-b056-c71f913db09b', '95648e26-0aeb-4687-a410-683cc06f1060', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', '729f60e0-4802-47ba-8e69-615ac28a1e35', '084a5b2b-d793-4718-b056-c71f913db09b', 'e9deb423-1323-41b9-8daf-89843203a59b', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_conversations (id, chatbot_id, organization_id, user_id, title)
  VALUES ('1c1b05f5-fe0f-4c5b-8402-5150ac0d0de3', '1c71040d-c53d-44e7-b136-ad086e351a57', 'cc269e52-2cd2-4502-a9ca-c904446482d9', 'd5b47623-9f07-4308-8057-7a97779c5607', 'Chat about Support Agent') ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, role, content, model, input_tokens, output_tokens)
  VALUES ('7b96e284-a450-4f99-902d-c2fc9c658091', '1c1b05f5-fe0f-4c5b-8402-5150ac0d0de3', 'user', 'Hello Support Agent', 'gpt-4o', 10, 0) ON CONFLICT DO NOTHING;

  INSERT INTO public.chat_messages (id, conversation_id, parent_id, role, content, model, input_tokens, output_tokens)
  VALUES ('19a71620-b629-44c8-bb8d-5bc0b9879825', '1c1b05f5-fe0f-4c5b-8402-5150ac0d0de3', '7b96e284-a450-4f99-902d-c2fc9c658091', 'assistant', 'How can I help?', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;

  INSERT INTO public.ai_model_usage (organization_id, chatbot_id, conversation_id, message_id, provider, model, input_tokens, output_tokens)
  VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', '1c71040d-c53d-44e7-b136-ad086e351a57', '1c1b05f5-fe0f-4c5b-8402-5150ac0d0de3', '19a71620-b629-44c8-bb8d-5bc0b9879825', 'openai', 'gpt-4o', 10, 20) ON CONFLICT DO NOTHING;
  INSERT INTO public.api_keys (organization_id, name, key_prefix, key_hash) VALUES ('99442f8d-dda4-4b21-952b-bfe9572d6cd1', 'Prod Key', 'sk_prod_', 'a99f0944-a35e-4b10-8394-8fcab3c1bff5') ON CONFLICT DO NOTHING;
  INSERT INTO public.api_keys (organization_id, name, key_prefix, key_hash) VALUES ('5a6ed645-540e-49a7-8594-17f40532fdb2', 'Prod Key', 'sk_prod_', 'abe1f623-a339-4fd8-ab62-9e9531305171') ON CONFLICT DO NOTHING;
  INSERT INTO public.api_keys (organization_id, name, key_prefix, key_hash) VALUES ('cc269e52-2cd2-4502-a9ca-c904446482d9', 'Prod Key', 'sk_prod_', '20cf1074-e76c-4093-b893-46f454c333cf') ON CONFLICT DO NOTHING;

END $$;
